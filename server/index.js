const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow cross-origin resource sharing for static files
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: 'Too many requests from this IP, please try again later.' }
});

// Apply rate limiting to all requests
app.use(limiter);

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Seed default admin and settings if not exist
const seed = async () => {
  const userCount = await prisma.adminUser.count();
  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.adminUser.create({
      data: {
        username: 'admin',
        password: hashedPassword
      }
    });
    console.log('Default admin created: admin / admin123');
  }

  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    await prisma.siteSettings.create({
      data: {
        id: 1,
        siteTitle: 'Mosk Bilişim',
        siteDescription: 'Coğrafi Bilgi Sistemleri ve Akıllı Şehir Çözümleri',
        siteKeywords: 'CBS, GIS, Akıllı Şehir, Yazılım',
        phone: '+90 224 451 98 12',
        email: 'info@moskbilisim.com',
        address: 'Çamlıca Mah. 1. Niyet Sk. No:43A NİLÜFER/ BURSA',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com'
      }
    });
    console.log('Default settings created');
  }
};

seed().catch(e => {
  console.error(e);
  process.exit(1);
});

// Routes

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];

  try {
    const user = await prisma.adminUser.findUnique({ where: { username } });
    
    if (!user) {
      await prisma.loginLog.create({
        data: { username, ipAddress: String(ipAddress), userAgent, status: 'FAILURE' }
      });
      return res.status(400).json({ error: 'User not found' });
    }

    // Check Lockout
    if (user.lockoutUntil && new Date() < user.lockoutUntil) {
      await prisma.loginLog.create({
        data: { username, ipAddress: String(ipAddress), userAgent, status: 'LOCKED' }
      });
      const remainingTime = Math.ceil((user.lockoutUntil - new Date()) / 1000 / 60);
      return res.status(403).json({ error: `Account locked. Try again in ${remainingTime} minutes.` });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const attempts = user.failedLoginAttempts + 1;
      let lockoutUntil = null;
      if (attempts >= 5) {
        lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes lockout
      }
      
      await prisma.adminUser.update({
        where: { id: user.id },
        data: { failedLoginAttempts: attempts, lockoutUntil }
      });

      await prisma.loginLog.create({
        data: { username, ipAddress: String(ipAddress), userAgent, status: 'FAILURE' }
      });
      
      const remaining = 5 - attempts;
      const errorMsg = remaining > 0 
        ? `Hatalı şifre. Kalan deneme hakkı: ${remaining}` 
        : 'Çok fazla hatalı giriş. Hesabınız 15 dakika kilitlendi.';
      
      return res.status(400).json({ error: errorMsg });
    }
    
    // Success - Reset counters
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockoutUntil: null, lastLoginAt: new Date() }
    });

    await prisma.loginLog.create({
      data: { username, ipAddress: String(ipAddress), userAgent, status: 'SUCCESS' }
    });
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', timestamp: new Date() });
});

// Admin User Management Routes

// Get all admin users
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    const users = await prisma.adminUser.findMany({
      select: { 
        id: true, 
        username: true, 
        fullName: true, 
        email: true, 
        lastLoginAt: true, 
        createdAt: true,
        failedLoginAttempts: true,
        lockoutUntil: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create admin user
app.post('/api/admin/users', authenticateToken, async (req, res) => {
  const { username, password, fullName, email } = req.body;
  try {
    const existingUser = await prisma.adminUser.findUnique({ where: { username } });
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.adminUser.create({
      data: { 
        username, 
        password: hashedPassword, 
        fullName, 
        email 
      }
    });
    res.json({ id: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Delete admin user
app.delete('/api/admin/users/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  
  if (req.user.id === parseInt(id)) {
    return res.status(400).json({ error: 'Cannot delete yourself' });
  }

  try {
    await prisma.adminUser.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Dashboard Stats
app.get('/api/admin/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const [serviceCount, menuCount, newsCount, postCount, loginLogs] = await Promise.all([
      prisma.service.count(),
      prisma.menuItem.count(),
      prisma.news.count(),
      prisma.socialMediaPost.count(),
      prisma.loginLog.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' }
      })
    ]);
    
    res.json({
      counts: {
        services: serviceCount,
        menus: menuCount,
        news: newsCount,
        posts: postCount
      },
      apiStatus: 'Active',
      recentLogins: loginLogs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get Settings (Public)
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    res.json(settings || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Upload Route
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Update Settings (Protected)
app.put('/api/settings', authenticateToken, async (req, res) => {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: req.body,
      create: { id: 1, ...req.body }
    });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Verify Token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Menu Routes

// Get all menus (Public)
app.get('/api/menus', async (req, res) => {
  try {
    const menus = await prisma.menuItem.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menus' });
  }
});

// Create menu item (Protected)
app.post('/api/menus', authenticateToken, async (req, res) => {
  try {
    const { title, slug, url, icon, parentId, order } = req.body;
    const menu = await prisma.menuItem.create({
      data: {
        title,
        slug,
        url,
        icon,
        parentId,
        order: order || 0
      }
    });
    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

// Reorder menus (Protected) - Must be before :id route
app.put('/api/menus/reorder', authenticateToken, async (req, res) => {
  const { items } = req.body; // Array of { id, order, parentId }
  try {
    const updates = items.map(item => 
      prisma.menuItem.update({
        where: { id: item.id },
        data: { 
          order: item.order,
          parentId: item.parentId
        }
      })
    );
    await prisma.$transaction(updates);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reorder menus' });
  }
});

// Update menu item (Protected)
app.put('/api/menus/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Delete menu item (Protected)
app.delete('/api/menus/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.menuItem.delete({
      where: { id: parseInt(id) }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

// Service Routes

// Configure Multer for Service Image Upload (Memory Storage for Sharp processing)
const serviceUpload = multer({ storage: multer.memoryStorage() });

// Upload Service Image Endpoint (Convert to WebP)
app.post('/api/upload/service', authenticateToken, serviceUpload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = `service-${uniqueSuffix}.webp`;
  const filepath = path.join('uploads', filename);
  
  try {
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(filepath);
      
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Sharp error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Get all services (Public)
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
      where: { isVisible: true }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get all services (Admin - includes invisible)
app.get('/api/admin/services', authenticateToken, async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get service by slug
app.get('/api/services/slug/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const service = await prisma.service.findUnique({ where: { slug } });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Create service
app.post('/api/services', authenticateToken, async (req, res) => {
  try {
    const count = await prisma.service.count();
    const service = await prisma.service.create({
      data: {
        ...req.body,
        order: count
      }
    });
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Reorder services
app.put('/api/services/reorder', authenticateToken, async (req, res) => {
  const { items } = req.body;
  try {
    const updates = items.map(item => 
      prisma.service.update({
        where: { id: item.id },
        data: { order: item.order }
      })
    );
    await prisma.$transaction(updates);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder services' });
  }
});

// Update service
app.put('/api/services/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const service = await prisma.service.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service
app.delete('/api/services/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.service.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// --- News Categories API ---

// Get all news categories
app.get('/api/news-categories', async (req, res) => {
  try {
    const categories = await prisma.newsCategory.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create news category
app.post('/api/news-categories', authenticateToken, async (req, res) => {
  try {
    const count = await prisma.newsCategory.count();
    const category = await prisma.newsCategory.create({
      data: {
        ...req.body,
        order: count
      }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update news category
app.put('/api/news-categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.newsCategory.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete news category
app.delete('/api/news-categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.newsCategory.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Reorder news categories
app.put('/api/news-categories/reorder', authenticateToken, async (req, res) => {
  const { items } = req.body;
  try {
    const updates = items.map(item => 
      prisma.newsCategory.update({
        where: { id: item.id },
        data: { order: item.order }
      })
    );
    await prisma.$transaction(updates);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder categories' });
  }
});

// News Routes

// Configure Multer for News Image Upload
const newsUpload = multer({ storage: multer.memoryStorage() });

// Upload News Image Endpoint (Convert to WebP)
app.post('/api/upload/news', authenticateToken, newsUpload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = `news-${uniqueSuffix}.webp`;
  const filepath = path.join('uploads', filename);
  
  try {
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(filepath);
      
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Sharp error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Get all news (Public)
app.get('/api/news', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { order: 'asc' },
      where: { isVisible: true },
      include: { 
        categories: true,
        images: true 
      }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get all news (Admin - includes invisible)
app.get('/api/admin/news', authenticateToken, async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { order: 'asc' },
      include: { 
        categories: true,
        images: true
      }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get news by slug
app.get('/api/news/slug/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const newsItem = await prisma.news.findUnique({ 
      where: { slug },
      include: { 
        categories: true,
        images: true
      }
    });
    if (!newsItem) return res.status(404).json({ error: 'News not found' });
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
});

// Create news
app.post('/api/news', authenticateToken, async (req, res) => {
  const { categoryIds, galleryImages, ...data } = req.body;
  try {
    const count = await prisma.news.count();
    const news = await prisma.news.create({
      data: {
        ...data,
        order: count,
        categories: {
          connect: categoryIds ? categoryIds.map(id => ({ id })) : []
        },
        images: {
          create: galleryImages ? galleryImages.map(url => ({ url })) : []
        }
      },
      include: { 
        categories: true,
        images: true
      }
    });
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create news' });
  }
});

// Reorder news
app.put('/api/news/reorder', authenticateToken, async (req, res) => {
  const { items } = req.body;
  try {
    const updates = items.map(item => 
      prisma.news.update({
        where: { id: item.id },
        data: { order: item.order }
      })
    );
    await prisma.$transaction(updates);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder news' });
  }
});

// Update news
app.put('/api/news/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { categoryIds, galleryImages, ...data } = req.body;
  try {
    // Delete existing images first if new ones are provided (simple replacement strategy)
    // Or better, handle images separately? For now, let's assume full replace of gallery
    if (galleryImages) {
      await prisma.newsImage.deleteMany({ where: { newsId: parseInt(id) } });
    }

    const news = await prisma.news.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        categories: categoryIds ? {
          set: categoryIds.map(id => ({ id }))
        } : undefined,
        images: galleryImages ? {
          create: galleryImages.map(url => ({ url }))
        } : undefined
      },
      include: { 
        categories: true,
        images: true
      }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news' });
  }
});

// Delete news
app.delete('/api/news/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.news.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

// Reference Routes

// Configure Multer for Reference Logo Upload
const referenceUpload = multer({ storage: multer.memoryStorage() });

// Upload Reference Logo Endpoint (Convert to WebP)
app.post('/api/upload/reference', authenticateToken, referenceUpload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = `ref-${uniqueSuffix}.webp`;
  const filepath = path.join('uploads', filename);
  
  try {
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(filepath);
      
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Sharp error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// --- Reference Categories API ---

// Get all categories
app.get('/api/reference-categories', async (req, res) => {
  try {
    const categories = await prisma.referenceCategory.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create category
app.post('/api/reference-categories', authenticateToken, async (req, res) => {
  try {
    const count = await prisma.referenceCategory.count();
    const category = await prisma.referenceCategory.create({
      data: {
        ...req.body,
        order: count
      }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update category
app.put('/api/reference-categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.referenceCategory.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete category
app.delete('/api/reference-categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.referenceCategory.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Reorder categories
app.put('/api/reference-categories/reorder', authenticateToken, async (req, res) => {
  const { items } = req.body;
  try {
    const updates = items.map(item => 
      prisma.referenceCategory.update({
        where: { id: item.id },
        data: { order: item.order }
      })
    );
    await prisma.$transaction(updates);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder categories' });
  }
});

// --- References API ---

// Get all references (with categories)
app.get('/api/references', async (req, res) => {
  try {
    const references = await prisma.reference.findMany({
      orderBy: { order: 'asc' },
      include: {
        categories: true
      }
    });
    res.json(references);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch references' });
  }
});

// Create reference
app.post('/api/references', authenticateToken, async (req, res) => {
  const { categoryIds, ...data } = req.body;
  try {
    const count = await prisma.reference.count();
    const reference = await prisma.reference.create({
      data: {
        ...data,
        order: count,
        categories: {
          connect: categoryIds.map(id => ({ id }))
        }
      },
      include: { categories: true }
    });
    res.json(reference);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create reference' });
  }
});

// Update reference
app.put('/api/references/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { categoryIds, ...data } = req.body;
  try {
    // First disconnect all categories, then connect new ones
    // Or use 'set' to replace relations
    const reference = await prisma.reference.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        categories: {
          set: categoryIds.map(id => ({ id }))
        }
      },
      include: { categories: true }
    });
    res.json(reference);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update reference' });
  }
});

// Delete reference
app.delete('/api/references/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.reference.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reference' });
  }
});

// Reorder references
app.put('/api/references/reorder', authenticateToken, async (req, res) => {
  const { items } = req.body;
  try {
    const updates = items.map(item => 
      prisma.reference.update({
        where: { id: item.id },
        data: { order: item.order }
      })
    );
    await prisma.$transaction(updates);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder references' });
  }
});

// --- Social Media Categories API ---

// Get all social media categories
app.get('/api/social-media-categories', async (req, res) => {
  try {
    const categories = await prisma.socialMediaCategory.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create social media category
app.post('/api/social-media-categories', authenticateToken, async (req, res) => {
  try {
    const count = await prisma.socialMediaCategory.count();
    const category = await prisma.socialMediaCategory.create({
      data: {
        ...req.body,
        order: count
      }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update social media category
app.put('/api/social-media-categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.socialMediaCategory.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete social media category
app.delete('/api/social-media-categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.socialMediaCategory.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Reorder social media categories
app.put('/api/social-media-categories/reorder', authenticateToken, async (req, res) => {
  const { items } = req.body;
  try {
    const updates = items.map(item => 
      prisma.socialMediaCategory.update({
        where: { id: item.id },
        data: { order: item.order }
      })
    );
    await prisma.$transaction(updates);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder categories' });
  }
});

// --- Social Media Posts API ---

// Get all social media posts
app.get('/api/social-media-posts', async (req, res) => {
  try {
    const posts = await prisma.socialMediaPost.findMany({
      orderBy: { order: 'asc' },
      include: { categories: true }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create social media post
app.post('/api/social-media-posts', authenticateToken, async (req, res) => {
  const { categoryIds, ...data } = req.body;
  try {
    const count = await prisma.socialMediaPost.count();
    const post = await prisma.socialMediaPost.create({
      data: {
        ...data,
        order: count,
        categories: {
          connect: categoryIds ? categoryIds.map(id => ({ id })) : []
        }
      },
      include: { categories: true }
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update social media post
app.put('/api/social-media-posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { categoryIds, ...data } = req.body;
  try {
    const post = await prisma.socialMediaPost.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        categories: categoryIds ? {
          set: categoryIds.map(id => ({ id }))
        } : undefined
      },
      include: { categories: true }
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete social media post
app.delete('/api/social-media-posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.socialMediaPost.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Reorder social media posts
app.put('/api/social-media-posts/reorder', authenticateToken, async (req, res) => {
  const { items } = req.body;
  try {
    const updates = items.map(item => 
      prisma.socialMediaPost.update({
        where: { id: item.id },
        data: { order: item.order }
      })
    );
    await prisma.$transaction(updates);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder posts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Keep alive
  setInterval(() => {
    console.log('Heartbeat');
  }, 10000);
});

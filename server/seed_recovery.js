const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting recovery seed...');

  // 1. Admin User
  const userCount = await prisma.adminUser.count();
  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.adminUser.create({
      data: {
        username: 'admin',
        password: hashedPassword
      }
    });
    console.log('Restored Admin User');
  }

  // 2. Site Settings
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
    console.log('Restored Site Settings');
  }

  // 3. Menus
  const menuCount = await prisma.menuItem.count();
  if (menuCount === 0) {
    const menus = [
      { title: 'Ana Sayfa', slug: '/', order: 0 },
      { title: 'Kurumsal', slug: 'about', order: 1 },
      { title: 'Hizmetlerimiz', slug: 'services', order: 2 },
      { title: 'Referanslar', slug: 'references', order: 3 },
      { title: 'Haberler', slug: 'news', order: 4 },
      { title: 'Sosyal Medya', slug: 'social-media', order: 5 },
      { title: 'İletişim', slug: 'contact', order: 6 },
    ];

    for (const menu of menus) {
      await prisma.menuItem.create({
        data: {
          title: menu.title,
          slug: menu.slug,
          url: menu.slug.startsWith('/') ? menu.slug : `/${menu.slug}`,
          order: menu.order,
          isVisible: true
        }
      });
    }
    console.log('Restored Menus');
  }

  // 4. Services
  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    const services = [
      { title: 'Coğrafi Bilgi Sistemleri', slug: 'cbs' },
      { title: 'Akıllı Şehir Çözümleri', slug: 'akilli-sehir' },
      { title: 'Mobil Uygulama Geliştirme', slug: 'mobil-uygulama' },
      { title: 'Web Tabanlı Yazılımlar', slug: 'web-yazilim' },
      { title: 'Veri Sayısallaştırma', slug: 'veri-sayisallastirma' },
      { title: 'Danışmanlık Hizmetleri', slug: 'danismanlik' }
    ];

    for (let i = 0; i < services.length; i++) {
      await prisma.service.create({
        data: {
          title: services[i].title,
          slug: services[i].slug,
          order: i,
          isVisible: true,
          shortDescription: 'Profesyonel çözümlerimiz ile işinizi geleceğe taşıyın.'
        }
      });
    }
    console.log('Restored Services');
  }

  // 5. Social Media Posts from linkedln.txt
  const socialCount = await prisma.socialMediaPost.count();
  if (socialCount === 0) {
    try {
      // Create Default Category
      const category = await prisma.socialMediaCategory.create({
        data: {
          name: 'Genel',
          slug: 'genel',
          order: 0
        }
      });

      const filePath = path.join(__dirname, '..', 'linkedln.txt');
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim() !== '');
        
        let order = 0;
        for (const line of lines) {
          let platform = 'LINKEDIN';
          let embedUrl = line;

          if (line.includes('instagram.com')) {
            platform = 'INSTAGRAM';
            const urlMatch = line.match(/data-instgrm-permalink="(https:\/\/www\.instagram\.com\/p\/[^"/]+)/);
            if (urlMatch) {
              embedUrl = urlMatch[1];
            } else if (line.includes('<script')) {
                continue; // Skip script tag
            }
          }

          if (embedUrl) {
            await prisma.socialMediaPost.create({
              data: {
                title: `${platform === 'LINKEDIN' ? 'LinkedIn' : 'Instagram'} Paylaşımı ${order + 1}`,
                platform: platform,
                embedUrl: embedUrl,
                order: order++,
                isVisible: true,
                categories: {
                  connect: { id: category.id }
                }
              }
            });
          }
        }
        console.log('Restored Social Media Posts from text file');
      }
    } catch (e) {
      console.error('Error restoring social media:', e);
    }
  }

  console.log('Recovery completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

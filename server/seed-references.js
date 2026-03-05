const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const UPLOADS_DIR = path.join(__dirname, 'uploads', 'referance');

// Helper function to convert filename to title
function formatTitle(filename) {
  // Remove file extension
  const nameWithoutExt = path.parse(filename).name;
  
  // Replace underscores and dashes with spaces
  let title = nameWithoutExt.replace(/[_-]/g, ' ');
  
  // Remove common suffixes like "bel", "icon", "(1)"
  title = title.replace(/\s*\(1\)/g, '');
  title = title.replace(/\s*icon/gi, '');
  title = title.replace(/(^|\s)bel($|\s)/gi, '$1Belediyesi$2'); // Expand "bel" to "Belediyesi"
  title = title.replace(/(^|\s)osb($|\s)/gi, '$1OSB$2'); // Expand "osb" to "OSB"
  
  // Capitalize words properly (Turkish support)
  title = title.split(' ').map(word => {
    // Special handling for "OSB" and "Belediyesi"
    if (word.toUpperCase() === 'OSB') return 'OSB';
    if (word.toUpperCase() === 'BELEDIYESI') return 'Belediyesi';
    if (word.toUpperCase() === 'TANAP') return 'TANAP';
    if (word.toUpperCase() === 'INVESTAZ') return 'InvestAZ';
    if (word.toUpperCase() === 'METAB') return 'METAB';
    if (word.toUpperCase() === 'BOSB') return 'BOSB';
    
    // Capitalize first letter
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ').trim();

  return title;
}

// Helper function to determine category based on title
function getCategoryName(title) {
  if (title.includes('Belediyesi')) return 'Belediyeler';
  if (title.includes('OSB') || title === 'BOSB') return 'Organize Sanayi Bölgeleri';
  if (title.includes('Film') || title.includes('InvestAZ') || title.includes('TANAP') || title.includes('METAB')) return 'Özel Sektör';
  return 'Diğer';
}

async function main() {
  console.log('Start seeding references from files...');

  // Ensure upload directory exists
  if (!fs.existsSync(UPLOADS_DIR)) {
    console.error(`Directory not found: ${UPLOADS_DIR}`);
    return;
  }

  // Get all files from the directory
  const files = fs.readdirSync(UPLOADS_DIR);
  const imageFiles = files.filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file));

  console.log(`Found ${imageFiles.length} image files.`);

  // Create categories first
  const categories = ['Belediyeler', 'Organize Sanayi Bölgeleri', 'Özel Sektör', 'Diğer'];
  const categoryMap = {};

  for (const catName of categories) {
    // Generate slug
    const slug = catName.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/\s+/g, '-');

    const category = await prisma.referenceCategory.upsert({
      where: { slug },
      update: {},
      create: {
        name: catName,
        slug,
        order: 0
      }
    });
    categoryMap[catName] = category.id;
  }

  // Process each file
  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const title = formatTitle(filename);
    
    // Construct the public URL path (assuming server serves 'uploads' statically)
    // IMPORTANT: Path separator should be forward slash for URLs
    const logoUrl = `http://localhost:3001/uploads/referance/${filename}`;
    
    // Determine category
    const categoryName = getCategoryName(title);
    const categoryId = categoryMap[categoryName];

    console.log(`Processing: ${filename} -> Title: "${title}", Category: "${categoryName}"`);

    // Check if reference exists (by title to avoid duplicates)
    const existingRef = await prisma.reference.findFirst({
      where: { title }
    });

    if (existingRef) {
      console.log(`Reference already exists: ${title}, updating...`);
      await prisma.reference.update({
        where: { id: existingRef.id },
        data: {
          logoUrl,
          order: i,
          categories: {
            connect: { id: categoryId }
          }
        }
      });
    } else {
      console.log(`Creating reference: ${title}`);
      await prisma.reference.create({
        data: {
          title,
          logoUrl,
          order: i,
          isVisible: true,
          categories: {
            connect: { id: categoryId }
          }
        }
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

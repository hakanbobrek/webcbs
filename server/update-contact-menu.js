const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating menu structure for Contact page...');

  // Add "İletişim" menu item if not exists
  await prisma.menuItem.upsert({
    where: { slug: 'iletisim' },
    update: {},
    create: {
      title: 'İletişim',
      slug: 'iletisim',
      url: '/contact',
      order: 10, // Ensure it's last
      isVisible: true
    }
  });

  console.log('Contact menu item created/updated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

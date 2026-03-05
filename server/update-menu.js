const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating menu structure with icons and submenus...');

  // Define main menu items with icons
  const mainMenuItems = [
    { title: 'Anasayfa', slug: 'home', url: '/', icon: 'Home', order: 0 },
    { title: 'Kurumsal', slug: 'about', url: '/about', icon: 'Building2', order: 1 },
    { title: 'Hizmetlerimiz', slug: 'services', url: '/#services', icon: 'Briefcase', order: 2 },
    { title: 'Referanslar', slug: 'references', url: '/references', icon: 'Users', order: 3 },
    { title: 'Haberler', slug: 'news', url: '/news', icon: 'Newspaper', order: 4 },
    { title: 'Sosyal Medya', slug: 'social-media', url: '/social-media', icon: 'Share2', order: 5 },
    { title: 'İletişim', slug: 'contact', url: '/contact', icon: 'Phone', order: 6 },
  ];

  const menuMap = {};

  // 1. Create/Update Main Menu Items
  for (const item of mainMenuItems) {
    const existingMenu = await prisma.menuItem.findFirst({
      where: { 
        OR: [
          { slug: item.slug },
          { title: item.title } // Fallback check by title
        ]
      }
    });

    if (existingMenu) {
      console.log(`Updating main menu: ${item.title}`);
      const updated = await prisma.menuItem.update({
        where: { id: existingMenu.id },
        data: {
          title: item.title,
          slug: item.slug, // Ensure slug is standard
          url: item.url,
          icon: item.icon,
          order: item.order,
          isVisible: true
        }
      });
      menuMap[item.slug] = updated.id;
    } else {
      console.log(`Creating main menu: ${item.title}`);
      const created = await prisma.menuItem.create({
        data: {
          title: item.title,
          slug: item.slug,
          url: item.url,
          icon: item.icon,
          order: item.order,
          isVisible: true
        }
      });
      menuMap[item.slug] = created.id;
    }
  }

  // 2. Add Services as Sub-menu to "Hizmetlerimiz"
  const servicesMenuId = menuMap['services'];
  
  if (servicesMenuId) {
    // Fetch all active services
    const services = await prisma.service.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' }
    });

    console.log(`Found ${services.length} services to add as sub-menus.`);

    // First, remove existing sub-menus for Services to ensure clean slate (optional, but safer for re-runs)
    // Or just update them. Let's update/create.

    for (const service of services) {
      const subSlug = `service-${service.slug}`; 
      
      const existingSubMenu = await prisma.menuItem.findFirst({
        where: { 
          OR: [
            { slug: subSlug },
            // Also check by URL to prevent duplicates if slug changed
            { url: `/services/${service.slug}` }
          ],
          parentId: servicesMenuId
        }
      });

      const menuData = {
        title: service.shortTitle || service.title,
        slug: subSlug,
        url: `/services/${service.slug}`,
        parentId: servicesMenuId,
        order: service.order,
        icon: service.icon, // Use the same icon as the service
        isVisible: true
      };

      if (existingSubMenu) {
        console.log(`Updating sub-menu: ${menuData.title}`);
        await prisma.menuItem.update({
          where: { id: existingSubMenu.id },
          data: menuData
        });
      } else {
        console.log(`Creating sub-menu: ${menuData.title}`);
        await prisma.menuItem.create({
          data: menuData
        });
      }
    }
  }

  console.log('Menu update finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

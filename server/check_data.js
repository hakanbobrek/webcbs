const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  try {
    const menus = await prisma.menuItem.count();
    const news = await prisma.news.count();
    const references = await prisma.reference.count();
    const services = await prisma.service.count();
    const socialMedia = await prisma.socialMediaPost.count();
    
    console.log('Menus:', menus);
    console.log('News:', news);
    console.log('References:', references);
    console.log('Services:', services);
    console.log('Social Media:', socialMedia);
  } catch (error) {
    console.error('Error checking data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
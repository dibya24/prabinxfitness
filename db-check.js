const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function check() {
  console.log("Checking Admin Users...");
  try {
    const users = await prisma.adminUser.findMany();
    console.log("Total users found in database:", users.length);
    users.forEach(u => {
      console.log(`- ID: ${u.id}, Username: ${u.username}, Role: ${u.role}`);
    });
  } catch (err) {
    console.error("DB Connection error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
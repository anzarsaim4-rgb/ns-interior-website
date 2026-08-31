require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding N.S. INTERIOR database...');

  // 1. Seed Default Admin User
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    throw new Error(
      'ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env'
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const existingAdmin = await prisma.adminUser.findUnique({
    where: {
      username: adminUsername,
    },
  });

  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        username: adminUsername,
        passwordHash,
        name: 'Naushad (Contractor)',
      },
    });

    console.log('Admin user created successfully.');
  } else {
    await prisma.adminUser.update({
      where: {
        username: adminUsername,
      },
      data: {
        passwordHash,
      },
    });

    console.log('Admin password hash updated successfully.');
  }

  // 2. Seed Default Estimate Config Rates
  const defaultRates = [
    { categoryKey: 'modular_kitchen', title: 'Modular Kitchen Execution', minRateSqFt: 140, maxRateSqFt: 220, unit: 'sqft', description: 'BWP Marine Ply & Acrylic/PU Finishes' },
    { categoryKey: 'wardrobe', title: 'Wardrobes & Storage Units', minRateSqFt: 120, maxRateSqFt: 190, unit: 'sqft', description: 'Floor to ceiling sliding/hinged wardrobes' },
    { categoryKey: 'false_ceiling', title: 'False Ceiling & Cove Lighting', minRateSqFt: 90, maxRateSqFt: 140, unit: 'sqft', description: 'Saint-Gobain Gypsum with concealed LED channels' },
    { categoryKey: 'painting', title: 'Emulsion Painting & Polish', minRateSqFt: 25, maxRateSqFt: 45, unit: 'sqft', description: 'Asian Paints Royal & PU Polish' },
    { categoryKey: 'electrical', title: 'Concealed Wiring & Switches', minRateSqFt: 35, maxRateSqFt: 65, unit: 'sqft', description: 'FR Copper Wiring & Modular Switchboards' },
    { categoryKey: 'plumbing', title: 'Concealed Plumbing & Sanitaryware', minRateSqFt: 30, maxRateSqFt: 55, unit: 'sqft', description: 'CPVC Leak-tested piping & diverters' },
    { categoryKey: 'flooring', title: 'Vitrified Tile & SPC Laying', minRateSqFt: 40, maxRateSqFt: 85, unit: 'sqft', description: 'Laser aligned tiling & epoxy grouting' },
    { categoryKey: 'carpenter_work', title: 'Custom Carpentry & Furniture', minRateSqFt: 110, maxRateSqFt: 180, unit: 'sqft', description: 'TV units, shoe racks, crockeries' },
    { categoryKey: 'civil_work', title: 'Civil Masonry & Demolition', minRateSqFt: 30, maxRateSqFt: 60, unit: 'sqft', description: 'AAC block work, waterproofing, plaster' },
  ];

  for (const rate of defaultRates) {
    await prisma.estimateConfig.upsert({
      where: { categoryKey: rate.categoryKey },
      update: rate,
      create: rate,
    });
  }
  console.log('Seeded estimate configuration rates.');

  // 3. Seed Primary Service Areas
  const areas = [
    { slug: 'mumbra', name: 'Mumbra', district: 'Thane District', isPrimary: true, description: 'Core execution service area with rapid on-site supervision.' },
    { slug: 'thane', name: 'Thane', district: 'Thane District', isPrimary: true, description: 'Serving Thane West, Majiwada, Ghodbunder Road, and surrounds.' },
    { slug: 'mumbai', name: 'Mumbai', district: 'Mumbai Metropolitan Region', isPrimary: true, description: 'Serving Central & Western suburbs across Greater Mumbai.' },
    { slug: 'navi-mumbai', name: 'Navi Mumbai', district: 'Raigad / Thane', isPrimary: false, description: 'Serving Vashi, Nerul, Belapur, and Kharghar.' },
  ];

  for (const area of areas) {
    await prisma.serviceArea.upsert({
      where: { slug: area.slug },
      update: area,
      create: area,
    });
  }
  console.log('Seeded service areas.');

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

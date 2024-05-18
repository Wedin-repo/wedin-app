const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prismaSeed = new PrismaClient();

async function main() {
  // Delete existing data in a specific order due to foreign key constraints
  // await prismaClient.gift.deleteMany();
  // await prismaClient..deleteMany();
  // await prismaClient.category.deleteMany();

  // Seed categories
  const categories = await Promise.all(
    [
      'Luna de miel',
      'Casa',
      'Electrodomésticos',
      'Viajes',
      'Gastronomía',
      'Aventura',
      'Relax',
      'Cultura y arte',
    ].map(async name => {
      return prismaSeed.category.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    })
  );

  // Seed gift lists without quantity and totalPrice
  const giftlists = await Promise.all(
    categories.map(async category => {
      return prismaSeed.giftlist.create({
        data: {
          name: `${category.name} Package`,
          quantity: '0', // Initial placeholder
          totalPrice: '0', // Initial placeholder
          categoryId: category.id,
        },
      });
    })
  );

  // Seed gifts and assign to gift lists
  // biome-ignore lint/style/useConst: <explanation>
  let gifts = [];
  for (let i = 0; i < 200; i++) {
    const randomGiftlist = faker.helpers.arrayElement(giftlists);
    const defaultGift = await prismaSeed.gift.create({
      data: {
        name: faker.commerce.productName(),
        isDefault: true,
        price: faker.number.int({ min: 89000, max: 1820000 }).toString(),
        giftlistId: randomGiftlist.id,
        categoryId: randomGiftlist.categoryId,
        imageUrl: faker.image.url(),
      },
    });
    gifts.push(defaultGift);
  }

  // Update gift lists with calculated quantity and totalPrice
  // biome-ignore lint/style/useConst: <explanation>
  for (let giftlist of giftlists) {
    const giftsForList = gifts.filter(gift => gift.giftlistId === giftlist.id);
    const totalPrice = giftsForList.reduce(
      (acc, curr) => acc + Number(curr.price),
      0
    );
    await prismaSeed.giftlist.update({
      where: { id: giftlist.id },
      data: {
        quantity: giftsForList.length.toString(),
        totalPrice: totalPrice.toString(),
      },
    });
  }

  console.log('Database has been seeded. 🌱');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaSeed.$disconnect();
  });

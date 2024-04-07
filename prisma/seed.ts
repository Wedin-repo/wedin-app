const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

type UserMapType = {
  [email: string]: any;
};

async function main() {
  const seedData = {
    categories: [
      {
        id: 1,
        name: 'Luna de miel',
      },
      {
        id: 2,
        name: 'Cultura y arte',
      },
      {
        id: 3,
        name: 'Gastronomía',
      },
      {
        id: 4,
        name: 'Aventura',
      },
      {
        id: 5,
        name: 'Relax',
      },
    ],
    giftList: [
      {
        id: 1,
        name: 'Luna de miel grande',
        description: 'Para los que quieran colaborar con un regalo más grande',
        isDefault: true,
        quantity: '5',
        totalPrice: '3450',
      },
      {
        id: 2,
        name: 'Luna de miel pequeña',
        description: 'Para los que quieran colaborar con un regalo más pequeño',
        isDefault: true,
        quantity: '5',
        totalPrice: '660',
      },
      {
        id: 3,
        name: 'Luna de miel mediana',
        description: 'Para los que quieran colaborar con un regalo mediano',
        isDefault: true,
        quantity: '5',
        totalPrice: '1360',
      },
      {
        id: 4,
        name: 'Aventuras extremas',
        description: 'Para los amantes de la adrenalina y experiencias únicas',
        isDefault: true,
        quantity: '5',
        totalPrice: '2350',
      },
      {
        id: 5,
        name: 'Relax total',
        description: 'Para disfrutar de tranquilidad y paz en lugares soñados',
        isDefault: true,
        quantity: '5',
        totalPrice: '840',
      },
      {
        id: 6,
        name: 'Cultura y arte',
        isDefault: true,
        description:
          'Para explorar las maravillas culturales y artísticas del destino',
        quantity: '5',
        totalPrice: '580',
      },
    ],
    gifts: [
      {
        id: 1,
        name: 'Cena romántica',
        description: 'Cena romántica en un restaurante de lujo',
        isDefault: true,
        giftListId: 1,
        price: 1000,
        categoryId: 1,
      },
      {
        id: 2,
        name: 'Excursión en kayak',
        description: 'Aventura en kayak por los ríos más hermosos',
        isDefault: true,
        giftListId: 4,
        price: 300,
        categoryId: 4,
      },
      {
        id: 3,
        name: 'Masajes relajantes',
        description: 'Sesión de masajes para dos en un spa de lujo',
        isDefault: true,
        giftListId: 5,
        price: 200,
        categoryId: 5,
      },
      {
        id: 4,
        name: 'Visita a museo',
        description: 'Entradas para un museo emblemático',
        isDefault: true,
        giftListId: 6,
        price: 50,
        categoryId: 2,
      },
      {
        id: 5,
        name: 'Cata de vinos',
        description: 'Experiencia de cata de vinos en una viña prestigiosa',
        isDefault: true,
        giftListId: 3,
        price: 150,
        categoryId: 3,
      },
      {
        id: 6,
        name: 'Clase de surf',
        description: 'Clase de surf para dos en una playa icónica',
        isDefault: true,
        giftListId: 4,
        price: 200,
        categoryId: 4,
      },
      {
        id: 7,
        name: 'Paseo en globo',
        description: 'Paseo en globo aerostático al amanecer',
        isDefault: true,
        giftListId: 1,
        price: 500,
        categoryId: 1,
      },
      {
        id: 8,
        name: 'Tour gastronómico',
        description: 'Tour gastronómico por la ciudad, probando platos típicos',
        isDefault: true,
        giftListId: 6,
        price: 250,
        categoryId: 2,
      },
      {
        id: 9,
        name: 'Noche de hotel de lujo',
        description: 'Una noche en hotel de 5 estrellas',
        isDefault: true,
        giftListId: 1,
        price: 800,
        categoryId: 1,
      },
      {
        id: 10,
        name: 'Buceo con tortugas',
        description: 'Inmersión de buceo en un arrecife de coral',
        isDefault: true,
        giftListId: 4,
        price: 400,
        categoryId: 4,
      },
      {
        id: 11,
        name: 'Concierto privado',
        description: 'Un pequeño concierto privado de música local',
        isDefault: true,
        giftListId: 3,
        price: 600,
        categoryId: 3,
      },
      {
        id: 12,
        name: 'Picnic gourmet',
        description: 'Picnic en un parque nacional con productos gourmet',
        isDefault: true,
        giftListId: 2,
        price: 120,
        categoryId: 1,
      },
      {
        id: 13,
        name: 'Paseo a caballo',
        description: 'Paseo a caballo por paisajes naturales impresionantes',
        isDefault: true,
        giftListId: 5,
        price: 180,
        categoryId: 5,
      },
      {
        id: 14,
        name: 'Tour de street art',
        description: 'Recorrido guiado por las mejores obras de arte urbano',
        isDefault: true,
        giftListId: 6,
        price: 70,
        categoryId: 2,
      },
      {
        id: 15,
        name: 'Sesión de fotografía',
        description: 'Sesión fotográfica profesional en locaciones icónicas',
        isDefault: true,
        giftListId: 2,
        price: 250,
        categoryId: 1,
      },
      {
        id: 16,
        name: 'Curso de cocina local',
        description: 'Curso para aprender a preparar platos típicos del lugar',
        isDefault: true,
        giftListId: 3,
        price: 220,
        categoryId: 3,
      },
      {
        id: 17,
        name: 'Salto en paracaídas',
        description: 'Salto tándem en paracaídas sobre paisajes espectaculares',
        isDefault: true,
        giftListId: 4,
        price: 600,
        categoryId: 4,
      },
      {
        id: 18,
        name: 'Noche de observación estelar',
        description: 'Noche de observación de estrellas en un observatorio',
        isDefault: true,
        giftListId: 5,
        price: 160,
        categoryId: 5,
      },
      {
        id: 19,
        name: 'Cena en la playa',
        description: 'Cena privada en la playa al atardecer',
        isDefault: true,
        giftListId: 1,
        price: 700,
        categoryId: 1,
      },
      {
        id: 20,
        name: 'Excursión de senderismo',
        description:
          'Excursión guiada por senderos naturales con vistas increíbles',
        isDefault: true,
        giftListId: 2,
        price: 100,
        categoryId: 1,
      },
      {
        id: 21,
        name: 'Alquiler de jet ski',
        description: 'Alquiler de jet ski para un día de aventura en el mar',
        isDefault: true,
        giftListId: 4,
        price: 350,
        categoryId: 4,
      },
      {
        id: 22,
        name: 'Tarde de spa',
        description: 'Una tarde completa de relajación en un spa de primera',
        isDefault: true,
        giftListId: 5,
        price: 300,
        categoryId: 5,
      },
      {
        id: 23,
        name: 'Visita a jardines botánicos',
        description: 'Entrada a jardines botánicos con tour guiado',
        isDefault: true,
        giftListId: 6,
        price: 60,
        categoryId: 2,
      },
      {
        id: 24,
        name: 'Espectáculo de luces',
        description:
          'Entradas para un espectacular show de luces en un sitio histórico',
        isDefault: true,
        giftListId: 3,
        price: 90,
        categoryId: 3,
      },
      {
        id: 25,
        name: 'Paseo en bicicleta eléctrica',
        description: 'Alquiler de bicicleta eléctrica para recorrer la ciudad',
        isDefault: true,
        giftListId: 2,
        price: 80,
        categoryId: 1,
      },
      {
        id: 26,
        name: 'Taller de arte',
        description:
          'Participación en un taller de arte local para crear tu propia obra',
        isDefault: true,
        giftListId: 6,
        price: 150,
        categoryId: 2,
      },
      {
        id: 27,
        name: 'Tour submarino',
        description: 'Paseo en un submarino para explorar la vida marina',
        isDefault: true,
        giftListId: 4,
        price: 500,
        categoryId: 4,
      },
      {
        id: 28,
        name: 'Degustación de chocolates',
        description: 'Experiencia de degustación de chocolates artesanales',
        isDefault: true,
        giftListId: 2,
        price: 110,
        categoryId: 1,
      },
      {
        id: 29,
        name: 'Paseo en barco',
        description: 'Tour privado en barco al atardecer',
        isDefault: true,
        giftListId: 1,
        price: 450,
        categoryId: 1,
      },
      {
        id: 30,
        name: 'Escapada a una isla',
        description: 'Excursión de un día a una isla cercana con picnic incluido',
        isDefault: true,
        giftListId: 3,
        price: 320,
        categoryId: 3,
      },
    ],
    users: [
      {
        email: 'musk@example.com',
        name: 'Elon M',
      },
      {
        email: 'cuban@example.com',
        name: 'Mark C',
      },
    ],
    weddings: [
      {
        url: 'Musk-&-Cuban',
        date: '2024-06-01',
        location: 'Dreamy Venue',
      },
    ],
    wishLists: [
      {
        description: 'Our Dreamy Wedding',
      },
    ],
  };
  
  const categoriesData = seedData.categories;
  const giftListsData = seedData.giftList;
  const giftsData = seedData.gifts;
  const usersData = seedData.users;

  try {
    for (const category of categoriesData) {
      await prismaClient.category.create({
        data: {
          name: category.name,
        },
      });
    }

    for (const giftList of giftListsData) {
      await prismaClient.giftList.create({
        data: {
          name: giftList.name,
          description: giftList.description,
          isDefault: giftList.isDefault,
          quantity: giftList.quantity,
          totalPrice: giftList.totalPrice,
        },
      });
    }

    for (const gift of giftsData) {
      const categoryData = categoriesData.find(category => {
        return category['id'] === gift.categoryId;
      });

      const giftListData = giftListsData.find(list => {
        return list['id'] === gift.giftListId;
      });

      if (categoryData === undefined) {
        console.error(`Category with ID ${gift.categoryId} not found`);
        return;
      }

      if (giftListData === undefined) {
        console.error(`Gift List with ID ${gift.giftListId} not found`);
        return;
      }

      const category = await prismaClient.category.findFirst({
        where: { name: categoryData['name'] },
      });

      const giftList = await prismaClient.giftList.findFirst({
        where: { name: giftListData['name'] },
      });

      if (category === null) {
        console.error(`Category with ID ${gift.categoryId} not found in db`);
        return;
      }

      if (giftList === null) {
        console.error(`Gift List with ID ${gift.giftListId} not found in db`);
        return;
      }

      await prismaClient.gift.create({
        data: {
          name: gift.name,
          description: gift.description,
          isDefault: gift.isDefault,
          giftListId: giftList.id,
          price: gift.price.toString(),
          categoryId: category.id,
        },
      });
    }

    let usersMap: UserMapType = {};
    for (const user of usersData) {
      const createdUser = await prismaClient.user.create({
        data: user,
      });
      usersMap[user.email] = createdUser;
    }

    for (const wedding of seedData.weddings) {
      const bride = usersMap[seedData.users[0].email];
      const groom = usersMap[seedData.users[1].email];

      const createdWedding = await prismaClient.wedding.create({
        data: {
          url: wedding.url,
          date: new Date(wedding.date),
          location: wedding.location,
          brideId: bride.id,
          groomId: groom.id,
        },
      });

      const wishlist = await prismaClient.wishList.create({
        data: {
          description: seedData.wishLists[0].description,
          weddingId: createdWedding.id,
        },
      });

      await prismaClient.wedding.update({
        where: { id: createdWedding.id },
        data: {
          wishListId: wishlist.id,
        },
      });
    }

    //console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prismaClient.$disconnect();
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });

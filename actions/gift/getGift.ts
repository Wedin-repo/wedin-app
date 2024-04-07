import prisma from '@/db/client';

export type GiftParams = {
  category?: string;
};

export async function getGift({ searchParams }: { searchParams?: GiftParams }) {
  try {
    let query: any = {};
    const { category } = searchParams ?? {};

    if (category) {
      query.categoryId = category;
    }

    const gifts = await prisma.gift.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!gifts) return null;

    return gifts;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

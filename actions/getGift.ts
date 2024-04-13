import prisma from '@/db/client';

export type GetGiftParams = {
  category?: string;
};

export async function getGift({
  searchParams,
}: {
  searchParams?: GetGiftParams;
}) {
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

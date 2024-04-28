import prisma from '@/db/client';

export async function getGiftList(giftListId: string) {
  try {
    const giftList = await prisma.giftList.findUnique({
      where: {
        id: giftListId,
      },
    });

    if (!giftList) return null;

    return giftList;
  } catch (error: any) {
    console.error('Error retrieving gifts:', error);
    throw error;
  }
}

export type GetGiftListsParams = {
  category?: string;
  name?: string;
};

export async function getGiftLists({
  searchParams,
}: {
  searchParams?: GetGiftListsParams;
}) {
  try {
    let query: any = {};

    if (!searchParams) {
      const giftLists = await prisma.giftList.findMany({
        where: query,
      });

      if (!giftLists) return null;

      return giftLists;
    }

    const { category, name } = searchParams;

    if (name) {
      query.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (category) {
      query.categoryId = category;
    }

    const giftLists = await prisma.giftList.findMany({
      where: query,
    });

    if (!giftLists) return null;

    return giftLists;
  } catch (error: any) {
    console.error('Error retrieving gift lists:', error);
    throw error;
  }
}

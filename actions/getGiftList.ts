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

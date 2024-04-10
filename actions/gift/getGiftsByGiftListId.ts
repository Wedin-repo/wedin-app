import prisma from '@/db/client';

export async function getGiftsByGiftListId(giftListId: string) {
  try {
    const gifts = await prisma.gift.findMany({
      where: {
        giftListId: giftListId, 
      },
    });

    if (!gifts || gifts.length === 0) return null;

    return gifts;
  } catch (error: any) {
    console.error('Error retrieving gifts for the gift list:', error);
    throw error;
  }
}

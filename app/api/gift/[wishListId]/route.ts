import prisma from '@/db/client';
import { NextResponse } from 'next/server';

type UpdateWishListParams = {
  wishListId: string;
};

export async function POST(
  request: Request,
  { params }: { params: UpdateWishListParams }
) {
  const { wishListId } = params;

  const body = await request.json();
  const { giftIds } = body;

  if (!wishListId || !Array.isArray(giftIds)) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await prisma.wishList.update({
    where: { id: wishListId },
    data: {
      gifts: {
        connect: giftIds.map(giftId => ({ id: giftId })),
      },
    },
  });

  return NextResponse.json(result);
}

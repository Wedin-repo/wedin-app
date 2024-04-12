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
  const { giftId } = body;

  console.log(giftId);

  if (!wishListId) {
    return NextResponse.error();
  }

  const result = await prisma.wishList.update({
    where: { id: wishListId },
    data: {
      gifts: {
        connect: { id: giftId },
      },
    },
  });

  return NextResponse.json(result);
}

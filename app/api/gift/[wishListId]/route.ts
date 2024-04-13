import prisma from '@/db/client';
import { NextRequest, NextResponse } from 'next/server';

type UpdateWishListParams = {
  wishListId: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: UpdateWishListParams }
) {
  const { wishListId } = params;

  const body = await request.json();
  const { giftIds } = body;

  if (!wishListId || !Array.isArray(giftIds)) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await prisma.wishList.update({
      where: { id: wishListId },
      data: {
        gifts: {
          connect: giftIds.map(giftId => ({ id: giftId })),
        },
      },
    });

    return NextResponse.json({
      status: '200',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: '200',
    });
  }
}

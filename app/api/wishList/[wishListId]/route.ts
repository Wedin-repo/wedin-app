import prisma from '@/db/client';
import { revalidatePath } from 'next/cache';
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

export async function DELETE(
  request: Request,
  { params }: { params: UpdateWishListParams }
) {
  const { wishListId } = params;
  const body = await request.json();
  const { giftId } = body;

  if (!wishListId) {
    return new Response('WishList ID is required', { status: 400 });
  }

  try {
    const result = await prisma.wishList.update({
      where: { id: wishListId },
      data: {
        gifts: {
          disconnect: { id: giftId },
        },
      },
    });

    revalidatePath(`/dashboard`);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error removing gift from wishlist:', error);
    return new Response('Failed to remove gift from wishlist', { status: 500 });
  }
}

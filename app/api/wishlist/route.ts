// app/api/wishlist/route.ts

import { validateCategory, validateGiftAndWishlist } from '@/actions/helper';
import prisma from '@/db/client';
import { GiftSchema } from '@/schemas/forms';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request, res: Response) {
  /* const { wishlistId, giftId } = req.body;

  if (typeof giftId !== 'string' || typeof wishlistId !== 'string') {
    throw new Error('Invalid parameters');
  } */

  try {
    console.log('hello db');
    /* await prisma.wishList.update({
      where: { id: wishlistId },
      data: {
        gifts: {
          disconnect: { id: giftId },
        },
      },
    }); */

    return Response.json({
      status: 'Éxito! 🎁🗑',
      message: 'Regalo eliminado de tu lista.',
    });
  } catch (error: unknown) {
    console.log(error);
    /* return res.status(500).json({
      status: 'Error',
      message:
        error.message ||
        'An error occurred while deleting the gift from the wishlist.',
    }); */
  }
}

async function editGift(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  try {
    const validatedFields = GiftSchema.safeParse(body);

    if (!validatedFields.success) {
      throw new Error('Campos inválidos');
    }

    await validateCategory(validatedFields.data.categoryId);

    const { gift, wishlist } = await validateGiftAndWishlist(
      validatedFields.data.id,
      validatedFields.data.wishListId
    );

    const newGiftData = {
      name: validatedFields.data.name ?? gift.name,
      categoryId: validatedFields.data.categoryId ?? gift.categoryId,
      price: validatedFields.data.price ?? gift.price,
      isFavoriteGift: validatedFields.data.isFavoriteGift,
      isGroupGift: validatedFields.data.isGroupGift,
      isDefault: false,
      isEditedVersion: true,
      sourceGiftId: validatedFields.data.id,
      description: 'a new gift creater by user', // TODO: inform UX about description issue
    };

    let response;

    if (gift.isDefault) {
      response = await prisma.gift.create({
        data: { ...newGiftData },
      });
      await prisma.wishList.update({
        where: { id: validatedFields.data.wishListId },
        data: {
          gifts: {
            disconnect: { id: validatedFields.data.id },
            connect: { id: response?.id },
          },
        },
      });
    } else {
      response = await prisma.gift.update({
        where: { id: validatedFields.data.id },
        data: newGiftData,
      });
    }

    await prisma.wishList.update({
      where: { id: validatedFields.data.wishListId },
      data: {
        gifts: {
          connect: { id: response?.id },
        },
      },
    });

    return res.status(200).json({
      status: 'Éxito! 🎁🎉',
      message: 'Updated gift in wishlist successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'Error',
      message:
        error.message ||
        'An error occurred while editing the gift from the wishlist.',
    });
  }
}

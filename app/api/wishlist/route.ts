import prisma from '@/db/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function deleteGift(req: NextApiRequest, res: NextApiResponse) {
  const { wishlistId, giftId } = req.query;

  try {
    if (typeof giftId !== 'string' || typeof wishlistId !== 'string') {
      throw new Error('Invalid parameters');
    }

    await prisma.wishList.update({
      where: { id: wishlistId },
      data: {
        gifts: {
          disconnect: { id: giftId },
        },
      },
    });

    return res.status(200).json({
      status: 'Éxito! 🎁🗑️',
      message: 'Regalo eliminado de tu lista.',
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'Error',
      message:
        error.message ||
        'An error occurred while deleting the gift from the wishlist.',
    });
  }
}

async function addGift(req: NextApiRequest, res: NextApiResponse) {}

async function editGift(req: NextApiRequest, res: NextApiResponse) {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'PATCH') {
    return deleteGift(req, res);
  } else if (method === 'POST') {
    return addGift(req, res);
  } else if (method === 'PUT') {
    return editGift(req, res);
  } else {
    return res.status(405).end();
  }
}

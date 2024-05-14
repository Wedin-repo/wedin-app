'use server';

import prisma from '@/db/client';

export async function getWedding(userId: string) {
  try {
    const wedding = await prisma.wedding.findFirst({
      where: {
        OR: [{ brideId: userId }, { groomId: userId }],
      },
    });

    if (!wedding) return null;

    return wedding;
  } catch (error) {
    console.error(error);
    return null;
  }
}

'use server';

import prisma from '@/db/client';

export async function getWedding(userId: string | undefined) {
  try {
    if (!userId) return null;

    let wedding;

    wedding = await prisma.wedding.findFirst({
      where: { brideId: userId },
    });

    if (!wedding) {
      wedding = await prisma.wedding.findFirst({
        where: { groomId: userId },
      });
      if (!wedding) return null;
      return wedding;
    }

    return wedding;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

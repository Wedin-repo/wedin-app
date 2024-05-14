'use server';

import prisma from '@/db/client';
import { getCurrentUser } from '../getCurrentUser';

export async function getWedding() {
  const user = await getCurrentUser();

  if (!user) return null;

  const userId = user.id;

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

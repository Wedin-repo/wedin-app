'use server';

import prisma from '@/db/client';
import { getCurrentUser } from '../getCurrentUser';

export async function getEvent() {
  const user = await getCurrentUser();

  if (!user) return null;

  const userId = user.id;

  try {
    const event = await prisma.event.findFirst({
      where: {
        OR: [{ brideId: userId }, { groomId: userId }],
      },
    });

    if (!event) return null;

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
}

import prismaClient from '@/prisma/client';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/get-current-user';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return null;
  const userId = user.id;

  try {
    const event = await prismaClient.event.findFirst({
      include: {
        eventPrimaryUser: true,
        eventSecondaryUser: true,
      },
      where: {
        OR: [{ primaryUserId: userId }, { secondaryUserId: userId }],
      },
    });

    if (!event) return null;

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
}

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/get-current-user';
import prismaClient from '@/prisma/client';

export async function GET() {
  const user = await getCurrentUser();

  if (!user)
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 }
    );

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

    if (!event)
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error fetching event' },
      { status: 500 }
    );
  }
}

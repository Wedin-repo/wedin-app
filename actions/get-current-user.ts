// server side get current user

import { auth } from '@/auth';
import prisma from '@/db/client';

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) return null;

  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

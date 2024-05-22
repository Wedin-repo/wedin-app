// server side get current user

import { auth } from '@/auth';
import prismaClient from '@/prisma/client';

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) return null;

  try {
    const currentUser = await prismaClient.user.findUnique({
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

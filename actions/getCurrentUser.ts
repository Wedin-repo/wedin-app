// server side get current user

import { auth } from '@/auth';
import prisma from '@/db/client';

export async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

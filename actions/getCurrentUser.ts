import { auth } from '@/auth';
import prisma from '@/db/client';

export async function getSession() {
  return await auth();
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

import prisma from '@/db/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth';
import { revalidatePath } from 'next/cache';

export async function getSession() {
  return await getServerSession(authOptions);
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

    revalidatePath('/', 'layout');

    return currentUser;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

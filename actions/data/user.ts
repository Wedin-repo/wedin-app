// TODO: able to get user by id email
import prisma from '@/db/client';

export const getUserbyEmail = async (email: string) => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return currentUser;
  } catch (error) {
    return null;
  }
};

export const updateVerifiedOn = async (email: string) => {
  try {
    const currentUser = await prisma.user.update({
      where: { email: email },
      data: { emailVerified: new Date() },
    });
    return currentUser;
  } catch (error) {
    return null;
  }
};

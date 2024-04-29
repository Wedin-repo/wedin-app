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

export const updateUserById = async (
  userId: string,
  name: string,
  lastName: string,
  onboardingStep: number
) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        lastName: lastName,
        onboardingStep: onboardingStep,
      },
    });
  } catch (error) {
    return null;
  }
};

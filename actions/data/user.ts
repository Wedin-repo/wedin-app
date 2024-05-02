'use server';

import { ErrorResponse } from '@/auth';
import prisma from '@/db/client';
import { User } from '@prisma/client';

export const getUserByEmail = async (
  email: string
): Promise<User | ErrorResponse> => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: { email },
    });

    if (currentUser === null) {
      return { error: 'User not found' }; // Use return instead of throw to control flow
    }
    return currentUser;
  } catch (error: any) {
    console.error('Error getting user by email:', error);
    return { error: 'InternalError' };
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

export const upsertUser = async (email: string, provider?: string) => {
  try {
    return await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {
        email: email,
      },
      create: {
        email: email,
        // provider: provider,
      },
    });
  } catch (error) {
    console.error('Error upserting user:', error, provider);
  }
};

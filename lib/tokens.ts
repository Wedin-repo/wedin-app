import { getPasswordTokenResetByEmail } from '@/actions/data/password-token';
import { getVerificationTokenByEmail } from '@/actions/data/verification-token';
import prismaClient from '@/prisma/client';
import { v4 as uuid } from 'uuid';

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60); // Expires in 1 hour
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prismaClient.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prismaClient.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60); // Expires in 1 hour
  // const expires = new Date(new Date().getTime() + 1000 * 5); // Expires in 5 seconds
  const existingToken = await getPasswordTokenResetByEmail(email);

  if (existingToken) {
    await prismaClient.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prismaClient.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

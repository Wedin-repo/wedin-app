import { getPasswordTokenResetByEmail } from '@/actions/data/password-token';
import { getVerificationTokenByEmail } from '@/actions/data/verification-token';
import prisma from '@/db/client';
import { v4 as uuid } from 'uuid';

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60); // Expires in 1 hour
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
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
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

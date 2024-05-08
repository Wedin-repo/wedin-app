import prisma from '@/db/client';
import { getLoginUserByEmail } from './user';

export const getPasswordTokenResetByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const newPasswordReset = async (token: string) => {
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token invalido' };
    // generate new token -> go to /password-reset
  }

  const existinguser = await getLoginUserByEmail(existingToken.email);

  if (!existinguser) {
    return { error: 'Usuario no encontrado' };
    // generate new token -> go to /password-reset
  }

  try {
    await prisma.user.update({
      where: { email: existingToken.email },
      data: { emailVerified: new Date() },
    });
  } catch (error) {
    return { error: 'Error actualizando usuario' };
  }

  try {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  } catch (error) {
    return { error: 'Error eliminando token' };
  }
};

'use server';

import prisma from '@/db/client';
import { NewPasswordSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { getPasswordTokenResetByEmail } from '../data/password-token';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  email: string,
  token: string
) => {
  const passwordResetToken = await getPasswordTokenResetByEmail(email);

  if (!passwordResetToken || passwordResetToken.token !== token) {
    return { error: 'No hay un token de verificación asociado a este email' };
    // generate new token -> go to /password-reset
  }

  if (passwordResetToken.expires < new Date()) {
    return { error: 'El token ha expirado' };
    // generate new token -> go to /password-reset
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const { password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return { error: 'No hay una cuenta asociada a este email' };
    }

    try {
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
    } catch (error) {
      return {
        error: 'Error actualizando la contraseña',
      };
    }
  }
};

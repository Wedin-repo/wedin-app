'use server';

import prismaClient from '@/prisma/client';
import { NewPasswordSchema } from '@/schemas/auth';
import bcrypt from 'bcryptjs';
import type * as z from 'zod';
import { getPasswordTokenResetByEmail } from '../data/password-token';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  email: string,
  token: string
) => {
  const passwordResetToken = await getPasswordTokenResetByEmail(email);

  if (!passwordResetToken || passwordResetToken.token !== token) {
    return {
      error: 'No hay un token de verificación asociado a este email',
      redirect: '/password-reset',
    };
  }

  if (passwordResetToken.expires < new Date()) {
    return { error: 'El token ha expirado', redirect: '/password-reset' };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const { password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return {
        error: 'No hay una cuenta asociada a este email',
        redirect: '/register',
      };
    }

    try {
      await prismaClient.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
      return { success: 'Contraseña actualizada' };
    } catch (error) {
      return {
        error: 'Error actualizando contraseña por favor genere link otra vez',
        redirect: '/password-reset',
      };
    }
  }
};

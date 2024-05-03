'use server';

import prisma from '@/db/client';
import { NewPasswordSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  email: string
) => {
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

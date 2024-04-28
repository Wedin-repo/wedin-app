'use server';

import prisma from '@/db/client';
import { LoginSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const register = async (
  values: z.infer<typeof LoginSchema> | null = null
) => {
  if (values === undefined || values === null) {
    return { error: 'Algo salio mal! reintanta' };
  }

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await prisma.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        return { error: 'Email ya esta en uso' };
      }

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error) {
        return { error: 'Error creando usuario' };
      }
    }
  }
};

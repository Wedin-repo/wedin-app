'use server';

import { LoginSchema, PasswordResetSchema } from '@/schemas';
import prisma from '@/db/client';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const passwordReset = async (
  values: z.infer<typeof PasswordResetSchema>
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const { email } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return { error: 'No hay una cuenta asociada a este email' };
    }

    try {
      // Send email with password recovery link
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Credenciales incorrectas' };
          default:
            return { error: 'An error occurred' };
        }
      }

      throw error;
    }
  }
};

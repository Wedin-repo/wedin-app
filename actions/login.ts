'use server';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (
  type = 'credentials',
  values: z.infer<typeof LoginSchema> | null = null,
  redirectTo = '/dashboard'
) => {
  if (values === undefined || values === null) {
    try {
      await signIn(type, {
        redirectTo,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'AccessDenied':
            return { error: 'Credenciales incorrectas' };
          default:
            return { error: 'An error occurred' };
        }
      }

      throw error;
    }

    return;
  }

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;

    try {
      await signIn(type, {
        email,
        password,
        redirectTo,
      });
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

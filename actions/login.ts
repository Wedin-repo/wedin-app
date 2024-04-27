'use server';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  redirectTo = '/dashboard'
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;

    try {
      await signIn('credentials', {
        email,
        password,
      });
      return { success: true };
    } catch (error) {
      if (error instanceof AuthError) {
        console.log('error', error);

        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Credenciales incorrectas' };
          default:
            return { error: 'An error occurred' };
        }
      }
    }
  }
};

'use server';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  type = 'credentials',
  redirectTo = '/dashboard'
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;

    try {
      switch (type) {
        case 'credentials':
          await signIn('credentials', {
            email,
            password,
            redirectTo,
          });
          break;
        default:
          await signIn(type, {
            redirectTo: '/onboarding',
          });
      }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Invalid credentials' };
          default:
            return { error: 'An error occurred' };
        }
      }
    }
  }

  return { error: 'Invalid data' };
};

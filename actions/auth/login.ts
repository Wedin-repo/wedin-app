'use server';

import { signIn } from '@/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';
import { getLoginUserByEmail } from '../data/user';

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

    const existingUser = await getLoginUserByEmail(email);

    if (!existingUser) {
      return { error: 'Usuario no encontrado' };
    }

    // if (!existingUser.emailVerified) {
    //   const verificatiotionToken = await generateVerificationToken(email);
    //
    //   // Send email
    //
    //   // return
    //   //   error: 'Email no verificado, se ha enviado un correo de confirmacion',
    //   // };
    // }

    if (existingUser.password === null) {
      return { error: 'Deberias de ingresar sin contrasenha' };
    }

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

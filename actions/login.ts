import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import * as z from 'zod';

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;

    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
    } catch (error) {}
  }

  return { error: 'Invalid credentials' };
};

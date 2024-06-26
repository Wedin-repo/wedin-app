'use client';

import { passwordReset } from '@/actions/auth/password-reset';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { PasswordResetSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import AuthFormButton from './auth-form-button';

type PasswordResetFormProps = {
  isProviderLogin: (provider: 'google' | 'facebook') => void;
};

export default function PasswordResetForm(props: PasswordResetFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const passwordResetForm = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
  });

  async function handlePasswordReset(
    values: z.infer<typeof PasswordResetSchema>
  ) {
    setIsLoading(true);
    const validatedFields = PasswordResetSchema.safeParse(values);

    if (!validatedFields.success) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al tratar de recuperar tu contraseña',
        description: 'Por favor ingrese datos válidos',
      });
      setIsLoading(false);
      return;
    }

    if (validatedFields.success) {
      const response = await passwordReset(validatedFields.data);

      if (response?.provider) {
        toast({
          variant: 'destructive',
          title: 'Uh Oh! Error al tratar de recuperar tu contraseña',
          description: response.error,
          duration: 5000,
        });
        props.isProviderLogin(response.provider);
        setIsLoading(false);
        return;
      }

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Uh Oh! Error al tratar de recuperar tu contraseña',
          description: response.error,
          duration: 5000,
        });
        setIsLoading(false);
        return;
      }

      toast({
        variant: 'default',
        title: 'Exito!',
        description:
          'Se le ha enviado un correo con un link para restablecer su contraseña',
        duration: 5000,
      });

      // Temporary delete when email is implemented
      if (response?.resetLink) {
        router.push(response.resetLink);
      }

      setIsLoading(false);
    }
  }

  return (
    <Form {...passwordResetForm}>
      <form
        onSubmit={passwordResetForm.handleSubmit(handlePasswordReset)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <FormField
              control={passwordResetForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tucorreo@wedin.app"
                      className="!mt-1.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/login"
            className="flex justify-start items-start text-secondaryTextColor"
          >
            <span className="text-indigo-600">Volvé a iniciar sesión</span>
          </Link>

          <AuthFormButton
            isLoading={isLoading}
            label={
              isLoading
                ? 'Enviando link a tu correo'
                : 'Enviar link a tu Correo'
            }
          />
        </div>
      </form>
    </Form>
  );
}

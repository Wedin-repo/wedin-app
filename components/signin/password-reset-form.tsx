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
import { PasswordResetSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthFormButton from './auth-form-button';

export default function PasswordResetForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const passwordResetForm = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
  });

  async function handlePasswordReset(
    values: z.infer<typeof PasswordResetSchema>
  ) {
    setIsLoading(true);
    const validatedFields = PasswordResetSchema.safeParse(values);
    if (validatedFields.success) {
      const response = await passwordReset(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Uh Oh! Error al tratar de recuperar tu contraseña',
          description: response.error,
        });
      }
    }

    toast({
      variant: 'default',
      title: 'Exito!',
      description:
        'Se le ha enviado un correo con un link para restablecer su contraseña',
    });

    setIsLoading(false);
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

        <AuthFormButton
          isLoading={isLoading}
          label={
            isLoading ? `Enviando link a tu correo` : `Enviar link a tu Correo`
          }
        />
      </form>
    </Form>
  );
}

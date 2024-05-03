'use client';

import { newPassword } from '@/actions/auth/new-password';
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
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { z } from 'zod';
import AuthFormButton from './auth-form-button';

type NewPasswordFormProps = {
  email: string;
  token: string;
};

export default function NewPasswordForm({
  email,
  token,
}: NewPasswordFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const newPasswordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  async function handleNewPassword(values: z.infer<typeof NewPasswordSchema>) {
    setIsLoading(true);
    const validatedFields = NewPasswordSchema.safeParse(values);

    if (validatedFields.success && email) {
      const response = await newPassword(validatedFields.data, email, token);

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
      title: 'Contraseña actualizada!',
      description: 'La contraseña ha sido actualizada con éxito! Inicia sesión',
    });

    setIsLoading(false);
  }

  return (
    <Form {...newPasswordForm}>
      <form
        onSubmit={newPasswordForm.handleSubmit(handleNewPassword)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <FormField
            control={newPasswordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      {...field}
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="TuContraseña!52419$"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="ml-[-32px]"
                    >
                      {isPasswordVisible ? (
                        <IoEyeOffOutline size={20} />
                      ) : (
                        <IoEyeOutline size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="font-normal text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <FormField
            control={newPasswordForm.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirma tu contraseña</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      {...field}
                      type="password"
                      placeholder="**********"
                    />
                  </div>
                </FormControl>
                <FormMessage className="font-normal text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <AuthFormButton
          isLoading={isLoading}
          label={
            isLoading
              ? `Actualizando de contrasenha`
              : `Confirmar nueva contrasenha`
          }
        />
      </form>
    </Form>
  );
}

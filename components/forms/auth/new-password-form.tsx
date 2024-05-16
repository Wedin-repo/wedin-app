'use client';

import { login } from '@/actions/auth/login';
import { newPassword } from '@/actions/auth/new-password';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { LoginSchema, NewPasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import type { z } from 'zod';
import AuthFormButton from './auth-form-button';

type NewPasswordFormProps = {
  email: string;
  token: string;
};

export default function NewPasswordForm({
  email,
  token,
}: NewPasswordFormProps) {
  const { toast } = useToast();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState('');
  const newPasswordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  async function handleNewPassword(values: z.infer<typeof NewPasswordSchema>) {
    setIsLoading(true);
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al tratar de recuperar tu contraseña',
        description: 'No se ha encontrado el email en la url',
        duration: 5000,
      });

      setRedirect('/password-reset');
      setIsLoading(true);

      return;
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al tratar de recuperar tu contraseña',
        description: 'Contraseñas no coinciden o son inválidas',
        duration: 5000,
      });

      return;
    }

    const response = await newPassword(validatedFields.data, email, token);

    if (!response) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al tratar de recuperar tu contraseña',
        duration: 5000,
      });

      setErrorMessage('Error al tratar de recuperar tu contraseña');
      setIsLoading(false);
      setRedirect('/password-reset');

      return;
    }

    if (response.error) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al tratar de recuperar tu contraseña',
        duration: 5000,
        description: response.error,
      });

      setErrorMessage(response.error);
    }

    if (response.redirect) {
      setRedirect(response.redirect);
    }

    toast({
      variant: 'default',
      title: 'Contraseña actualizada!',
      description: 'Iniciando sesión...',
      duration: 5000,
    });

    const validatedLoginData = LoginSchema.safeParse({
      ...validatedFields.data,
      email,
    });

    if (!validatedLoginData.success) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al tratar de iniciar sesión',
        duration: 5000,
      });

      setErrorMessage('Error al tratar de iniciar sesión');
      setRedirect('/login');
      setIsLoading(false);

      return;
    }

    const loginResponse = await login(validatedLoginData.data, 'credentials');

    if (loginResponse?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al tratar de iniciar sesión',
        duration: 5000,
      });

      setErrorMessage('Error al tratar de iniciar sesión');
      setRedirect('/login');
      setIsLoading(false);

      return;
    }

    setIsLoading(false);
    return;
  }

  if (errorMessage && redirect) {
    return (
      <Card
        variant="emailVerification"
        size="emailVerification"
        className="text-center cursor-auto sm:w-full"
      >
        <CardHeader variant="emailVerification">
          <div className="flex justify-center items-center">
            <X className="w-20 h-20 text-red-600 animate-in" />
          </div>
        </CardHeader>
        <CardContent className="gap-4 justify-center p-4">
          <p>{errorMessage}</p>
          <Link
            href={`${redirect}`}
            className="flex justify-center items-center text-secondaryTextColor"
          >
            <span className="text-indigo-600">Volver a intentar</span>
          </Link>
        </CardContent>
      </Card>
    );
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
            isLoading ? 'Actualizando contraseña' : 'Confirmar nueva contraseña'
          }
        />
      </form>
    </Form>
  );
}

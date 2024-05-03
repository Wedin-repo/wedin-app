'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import AuthFormButton from './auth-form-button';
import { Form, useForm } from 'react-hook-form';
import { PasswordResetSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '../ui/use-toast';
import { newVerification } from '@/actions/data/verification-token';

type EmailVerifyFormProps = {};

function EmailVerifyForm({}: EmailVerifyFormProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
  });
  const token = searchParams.get('token');

  const handleEmailVerify = useCallback(async () => {
    setIsLoading(true);
    if (!token) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al verificar tu correo',
        description: 'No se ha encontrado el token en la url',
        duration: 5000,
      });

      setIsLoading(false);
      return;
    }

    const response = await newVerification(token);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al verificar tu correo',
        description: response.error,
        duration: 5000,
      });
    }

    setIsLoading(false);
    return;
  }, [toast, token]);

  useEffect(() => {
    handleEmailVerify();
  }, [handleEmailVerify]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleEmailVerify)}
        className="flex flex-col gap-8"
      >
        <AuthFormButton isLoading={isLoading} label="Enviar link a tu Correo" />
      </form>
    </Form>
  );
}

export default EmailVerifyForm;

'use client';

import { newVerification } from '@/actions/data/verification-token';
import Loader from '@/components/Loader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type EmailVerifyCardProps = {};

export default function EmailVerifyCard({}: EmailVerifyCardProps) {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('Verificando Email');
  const token = searchParams.get('token');

  const handleEmailVerify = useCallback(async () => {
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
    setStatus('Email verificado correctamente, redireccionando...');
    router.push('/login');
  }, [router, toast, token]);

  useEffect(() => {
    handleEmailVerify();
  }, [handleEmailVerify]);

  return (
    <Card
      className="text-center cursor-auto"
      variant="emailVerification"
      size="emailVerification"
    >
      <CardHeader>{isLoading && <Loader />}</CardHeader>
      <CardContent className="p-4">
        {status}
        <Link
          href="/login"
          className="flex justify-center items-center text-secondaryTextColor"
        >
          <span className="text-indigo-600 hover:underline">
            Volver al Login
          </span>
        </Link>
      </CardContent>
    </Card>
  );
}

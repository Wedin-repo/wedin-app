'use client';

import NewPasswordForm from '@/components/signin/new-password-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function NewPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token)
    return (
      <Card
        variant="emailVerification"
        size="emailVerification"
        className="text-center cursor-auto"
      >
        <CardHeader variant="emailVerification">
          <div className="flex justify-center items-center">
            <X className="w-20 h-20 text-red-600 animate-in" />
          </div>
        </CardHeader>
        <CardContent className="gap-4 justify-center p-4">
          <p>No se ha encontrado email en el link o token</p>
          <Link
            href="/password-reset"
            className="flex justify-center items-center text-secondaryTextColor"
          >
            <span className="text-indigo-600 hover:underline">
              Volver a enviar link a tu correo
            </span>
          </Link>
        </CardContent>
      </Card>
    );

  return (
    <div className="flex flex-col gap-8 justify-around items-center lg:flex-row sm:w-[440px] w-[85%]">
      <div className="flex flex-col gap-6 justify-start w-full h-full">
        <p className="text-2xl font-semibold text-center sm:text-3xl">
          Ingresá a tu Nueva Contraseña
        </p>

        <NewPasswordForm email={email} token={token} />
      </div>
    </div>
  );
}

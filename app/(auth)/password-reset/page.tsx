'use client';

import PasswordResetForm from '@/components/forms/auth/password-reset-form';
import SociaMediaLoginButton from '@/components/forms/auth/socia-media-login-form';
import { capitalizeFirstLetter } from '@/lib/utils';
import { MoveDown } from 'lucide-react';
import { useState } from 'react';

export default function PasswordResetPage() {
  const [providerLogin, isProviderLogin] = useState<'google' | 'facebook' | ''>(
    ''
  );
  return (
    <div className="flex flex-col gap-8 justify-around items-center lg:flex-row sm:w-[440px] w-[85%]">
      <div className="flex flex-col gap-6 justify-start w-full h-full">
        <p className="text-2xl font-semibold text-center sm:text-3xl">
          {!providerLogin && 'Ingresá a tu correo'}
          {providerLogin &&
            `Ya tienes cuenta con ${capitalizeFirstLetter(providerLogin)}`}
        </p>

        {providerLogin && (
          <div className="flex flex-col gap-8 items-center">
            <p className="text-xl text-center">Click para iniciar sesion</p>
            <MoveDown className="animate-bounce" />
            <SociaMediaLoginButton provider={providerLogin} />
          </div>
        )}
        {!providerLogin && (
          <PasswordResetForm isProviderLogin={isProviderLogin} />
        )}
      </div>
    </div>
  );
}

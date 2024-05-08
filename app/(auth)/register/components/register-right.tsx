'use client';

import RegisterForm from '@/components/signin/register-form';
import SociaMediaLoginButton from '@/components/signin/socia-media-login-form';
import Link from 'next/link';

const RegisterRight = () => {
  return (
    <div className="flex flex-col gap-8 justify-around">
      <p className="text-2xl font-semibold text-center sm:text-3xl">
        Registrate en 3 minutos y creá tu lista de regalos
      </p>

      <RegisterForm />

      <div className="flex flex-col justify-between items-center py-4">
        <span className="w-1/2 border border-b" />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="text-secondaryTextColor">O registate con</span>
        <SociaMediaLoginButton provider="google" callbackUrl="/onboarding" />
        <SociaMediaLoginButton provider="facebook" callbackUrl="/onboarding" />
      </div>

      <Link
        href="/login"
        className="flex justify-center items-center text-secondaryTextColor"
      >
        Ya tenés una cuenta?&nbsp;
        <span className="text-indigo-600 hover:underline">Ingresá aquí</span>
      </Link>
    </div>
  );
};

export default RegisterRight;

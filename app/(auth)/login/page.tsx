import LoginForm from '@/components/signin/login-form';
import SociaMediaLoginForm from '@/components/signin/socia-media-login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8 justify-around items-center lg:flex-row h-[600px] sm:w-[440px] w-[85%]">
      <div className="flex flex-col justify-between w-full h-full">
        <p className="text-2xl font-semibold text-center sm:text-3xl">
          Ingresá a tu lista
        </p>

        <LoginForm />

        <div className="flex flex-col justify-between items-center py-4">
          <span className="w-1/2 border border-b" />
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <span className="text-secondaryTextColor">O inicia sesión con</span>
          <SociaMediaLoginForm provider="google" />
          <SociaMediaLoginForm provider="facebook" />
        </div>

        <Link
          href="/register"
          className="flex justify-center items-center text-secondaryTextColor"
        >
          No tenes una cuenta?&nbsp;
          <span className="text-indigo-600 hover:underline">
            Registrate aquí
          </span>
        </Link>
      </div>
    </div>
  );
}

import SingInFacebook from '@/components/signin/SignInFacebook';
import SingInGoogle from '@/components/signin/SignInGoogle';
import LoginForm from '@/components/signin/LoginForm';
import Link from 'next/link';

const LoginRight = () => {
  return (
    <div className="w-full max-w-md p-0 lg:p-8 space-y-6 bg-white text-black">
      <p className="text-2xl text-center font-semibold text-primaryTextColor">
        Ingresá a tu lista
      </p>

      <LoginForm />

      <div className="flex flex-col items-center justify-between py-4">
        <span className="w-1/2 border-b border" />
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-secondaryTextColor">O inicia sesión con</span>
        <SingInFacebook />
        <SingInGoogle />
      </div>

      <Link
        href="/register"
        className="flex items-center justify-center text-secondaryTextColor"
      >
        No tenes una cuenta?&nbsp;
        <span className="text-indigo-600 hover:underline">Registrate aquí</span>
      </Link>
    </div>
  );
};

export default LoginRight;

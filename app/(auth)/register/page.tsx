import Logo from '@/components/Logo';
import RegisterRight from './components/register-right';
import RegisterLeft from './components/register-left';

export default async function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-black gap-8 sm:gap-16 px-4 sm:px-10">
      <Logo />

      <div className="flex flex-col items-center justify-center lg:flex-row w-full gap-4">
        <div className="w-3/5 hidden lg:flex items-center justify-center">
          <RegisterLeft />
        </div>
        <div className="w-full lg:w-2/5 flex items-center justify-center">
          <RegisterRight />
        </div>
      </div>
    </div>
  );
}

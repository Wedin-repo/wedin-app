import Logo from '@/components/Logo';
import RegisterRight from './components/register-right';
import RegisterLeft from './components/register-left';

export default async function RegisterPage() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center px-4 text-black sm:gap-16 sm:px-10 min-h-[82vh]">
      <Logo />

      <div className="flex flex-col gap-4 justify-center items-center w-full lg:flex-row">
        <div className="hidden justify-center items-center w-3/5 lg:flex">
          <RegisterLeft />
        </div>
        <div className="flex justify-center items-center w-full lg:w-2/5">
          <RegisterRight />
        </div>
      </div>
    </div>
  );
}

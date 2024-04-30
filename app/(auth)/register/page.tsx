import Logo from '@/components/Logo';
import RegisterRight from './components/register-right';
import RegisterLeft from './components/register-left';

export default async function RegisterPage() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center p-6 h-full sm:p-0 text-foreground">
      <Logo height={38} />

      <div className="flex flex-col gap-4 justify-around items-center w-full lg:flex-row">
        <div className="hidden justify-center items-center w-2/5 lg:flex">
          <RegisterLeft />
        </div>
        <div className="flex justify-center items-center sm:w-[682px]">
          <RegisterRight />
        </div>
      </div>
    </div>
  );
}

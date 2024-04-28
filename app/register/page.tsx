import Logo from '@/components/Logo';
import RegisterLeft from './RegisterLeft';
import RegisterRight from './RegisterRight';

const RegisterPage = async () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-black gap-8 sm:gap-16 px-4 sm:px-10">
      <div>
        <Logo />
      </div>

      <div className="flex-col lg:flex-row flex items-center justify-center w-full gap-4">
        <div className="w-3/5 hidden lg:flex items-center justify-center">
          <RegisterLeft />
        </div>
        <div className="w-full lg:w-2/5 flex items-center justify-center">
          <RegisterRight />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

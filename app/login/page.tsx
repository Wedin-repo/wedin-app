import Logo from '@/components/Logo';
import Login from './Login';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-black gap-16 px-4 sm:px-10">
      <Logo />

      <div className="flex-col lg:flex-row flex items-center justify-center w-full gap-4">
        <div className="w-full lg:w-2/5 flex items-center justify-center">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

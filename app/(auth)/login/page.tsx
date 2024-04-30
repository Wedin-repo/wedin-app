import Logo from '@/components/Logo';
import Login from './Login';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 h-full sm:px-10 text-foreground">
      <Logo height={38} />

      <div className="flex flex-col gap-4 justify-center items-center w-full lg:flex-row">
        <div className="flex justify-center items-center w-full lg:w-2/5">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

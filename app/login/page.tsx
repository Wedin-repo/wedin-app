import { getCurrentUser } from '@/actions/getCurrentUser';
import Logo from './Logo';
import Login from './Login';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-black gap-16 px-10">
      <div>
        <Logo />
      </div>

      <div className="flex-col lg:flex-row flex items-center justify-center w-full gap-4">
        <div className="w-full lg:w-2/5 flex items-center justify-center">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

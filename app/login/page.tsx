//import Input from "../components/inputs/Input";
// import { Button } from "@/components/ui/button";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../utils/auth";
// import { redirect } from "next/navigation";
import { getCurrentUser } from '@/actions/getCurrentUser';
import Logo from './Logo';
import LoginRight from './LoginRight';
import RegisterLeft from './RegisterLeft';
import { redirect } from 'next/navigation';

const LoginPage = async () => {

  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect('/');
  }

  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  }); */

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-black gap-16 px-10">
      <div>
        <Logo />
      </div>

      <div className="flex-col lg:flex-row flex items-center justify-center w-full gap-4">
        {/* <div className="w-3/5 hidden lg:flex items-center justify-center">
          <RegisterLeft />
        </div> */}
        <div className="w-full lg:w-2/5 flex items-center justify-center">
          <LoginRight />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

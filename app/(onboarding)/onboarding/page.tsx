import { getCurrentUser } from '@/actions/getCurrentUser';
import Logo from '@/components/logo';
import { CiImageOn } from 'react-icons/ci';
import OnboardingStepper from './components/onboarding-stepper';

export default async function OnboardingPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col gap-8 sm:justify-between justify-around items-center h-full lg:flex-row w-[85%]">
      <div className="hidden justify-center items-center w-3/5 rounded-xl lg:flex bg-secondaryBackgroundColor h-[600px]">
        <CiImageOn fontSize={'54px'} color="#A1A1AA" />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-8 items-center">
          <Logo />
          <OnboardingStepper currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

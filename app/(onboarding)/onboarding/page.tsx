import { getCurrentUser } from '@/actions/getCurrentUser';
import Logo from '@/components/Logo';
import { CiImageOn } from 'react-icons/ci';
import OnboardingForm from './components/onboarding-form';

export default async function OnboardingPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col gap-8 sm:justify-between justify-around items-center h-full lg:flex-row w-[85%]">
      <div className="hidden justify-center items-center w-3/5 rounded-xl lg:flex bg-secondaryBackgroundColor h-[600px]">
        <CiImageOn fontSize={'54px'} color="#A1A1AA" />
      </div>
      <div className="flex justify-center items-center">
        {/* This width w \as added because for some reason the step two form did not grow*/}
        <div className="flex flex-col gap-8 justify-center items-center sm:w-[682px]">
          <Logo height={38} />
          <OnboardingForm currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

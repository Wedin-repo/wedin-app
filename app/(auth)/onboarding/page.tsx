import { getCurrentUser } from '@/actions/getCurrentUser';
import Logo from '@/components/Logo';
import { CiImageOn } from 'react-icons/ci';
import OnboardingForm from './components/onboarding-form';

export default async function OnboardingPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col gap-4 justify-around items-center p-6 h-full sm:p-0 lg:flex-row">
      <div className="hidden justify-center items-center w-2/5 lg:flex">
        <div className="flex justify-center items-center w-full rounded-xl bg-secondaryBackgroundColor h-[600px]">
          <CiImageOn fontSize={'54px'} color="#A1A1AA" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        {/* This width was added because for some reason the step two form did not grow*/}
        <div className="flex flex-col gap-8 justify-center items-center sm:w-[682px]">
          <Logo />
          <OnboardingForm currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

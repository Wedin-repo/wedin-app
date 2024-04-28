'user client';

import { getCurrentUser } from '@/actions/getCurrentUser';
import Logo from '@/components/Logo';
import { CiImageOn } from 'react-icons/ci';
import OnboardingForm from './components/onboarding-form';

export default async function OnboardingPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center gap-4 h-full sm:p-0 p-6">
      <div className="w-2/5 hidden lg:flex items-center justify-center">
        <div className="bg-secondaryBackgroundColor w-full h-[600px] flex items-center justify-center rounded-xl">
          <CiImageOn fontSize={'54px'} color="#A1A1AA" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/* This width was added because for some reason the step two form did not grow*/}
        <div className="flex flex-col gap-8 items-center justify-center sm:w-[682px]">
          <Logo />
          <OnboardingForm currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

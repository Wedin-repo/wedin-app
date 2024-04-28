'user client';

import { getCurrentUser } from '@/actions/getCurrentUser';
import Logo from '@/components/Logo';
import { CiImageOn } from 'react-icons/ci';
import OnboardingForm from './components/onboarding-form';

export default async function OnboardingPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  return (
    <div className="flex-col lg:flex-row flex items-center justify-center w-full gap-4 px-4 sm:px-10 min-h-[82vh]">
      <div className="w-2/5 hidden lg:flex items-center justify-center">
        <div className="bg-secondaryBackgroundColor w-full h-[600px] flex items-center justify-center rounded-xl">
          <CiImageOn fontSize={'54px'} color="#A1A1AA" />
        </div>
      </div>
      <div className="w-full lg:w-3/5 flex items-center justify-center">
        <div className="flex flex-col gap-8 items-center jsutify-center">
          <Logo />
          <OnboardingForm currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

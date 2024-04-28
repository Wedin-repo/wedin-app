'use client';

import { User } from '@prisma/client';
import { useState } from 'react';
import FirstStep from './first-step';
import SecondStep from './second-step';

type OnboardingFormProps = {
  currentUser?: User;
};

export default function OnboardingForm({ currentUser }: OnboardingFormProps) {
  const [currentPage, setCurrentPage] = useState(
    currentUser?.onboardingStep || 1
  );

  return (
    <>
      {currentPage === 1 && <FirstStep onNextStep={() => setCurrentPage(2)} />}

      {currentPage === 2 && <SecondStep />}
    </>
  );
}

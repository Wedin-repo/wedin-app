'use client';

import { User } from '@prisma/client';
import { useState } from 'react';
import StepOne from './step-one';
import StepTwo from './step-two';

type OnboardingFormProps = {
  currentUser?: User;
};

export default function OnboardingForm({ currentUser }: OnboardingFormProps) {
  const [currentPage, setCurrentPage] = useState(
    currentUser?.onboardingStep || 1
  );

  return (
    <>
      {currentPage === 1 && <StepOne onNextStep={() => setCurrentPage(2)} />}

      {currentPage === 2 && <StepTwo />}
    </>
  );
}

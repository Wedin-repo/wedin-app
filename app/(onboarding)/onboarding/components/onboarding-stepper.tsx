'use client';

import type { User } from '@prisma/client';
import { useState } from 'react';
import StepOne from './step-one';
import StepTwo from './step-two';

type OnboardingStepperProps = {
  currentUser?: User | null;
};

export default function OnboardingStepper({
  currentUser,
}: OnboardingStepperProps) {
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

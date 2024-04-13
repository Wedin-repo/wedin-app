'use client';

import { User } from '@prisma/client';
import { useState } from 'react';
import FirstStep from './first-step/first-step';
import SecondStep from './second-step/second-step';

type OnboardingFormProps = {
  currentUser: User;
};

const OnboardingForm = ({ currentUser }: OnboardingFormProps) => {
  const [currentPage, setCurrentPage] = useState(currentUser.onboardingStep);

  return (
    <>
      {currentPage === 1 && (
        <FirstStep
          currentUser={currentUser}
          onNextStep={() => setCurrentPage(2)}
        />
      )}

      {currentPage === 2 && <SecondStep currentUser={currentUser} />}
    </>
  );
};

export default OnboardingForm;

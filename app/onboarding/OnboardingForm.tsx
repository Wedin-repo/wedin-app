'use client';

import { User } from '@prisma/client';
import { useState } from 'react';
import FirstStep from './firstStep/FirstStep';
import SecondStep from './secondStep/SecondStep';

type OnboardingFormProps = {
  currentUser: User;
};

const OnboardingForm = ({ currentUser }: OnboardingFormProps) => {
  const [currentPage, setCurrentPage] = useState(
    currentUser?.onboardingStep || 1
  );

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

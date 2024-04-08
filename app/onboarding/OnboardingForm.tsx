'use client';

import * as React from 'react';
import { User } from '@prisma/client';
import FirstStep from './firstStep/FirstStep';
import SecondStep from './secondStep/SecondStep';

type OnboardingFormProps = {
  currentUser: User;
};

const OnboardingForm = ({ currentUser }: OnboardingFormProps) => {
  const [currentPage, setCurrentPage] = React.useState(
    currentUser.onboardingStep
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

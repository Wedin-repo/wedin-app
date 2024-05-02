'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import AuthFormButton from './auth-form-button';

type SocialMediaLoginFormType = {
  provider: 'google' | 'facebook';
  callbackUrl?: string;
};
function SociaMediaLoginForm({
  provider,
  callbackUrl = '/dashboard',
}: SocialMediaLoginFormType) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignIn = () => {
    setIsLoading(true);

    signIn(provider, { callbackUrl: callbackUrl });

    setIsLoading(false);
  };

  return (
    <AuthFormButton
      variant="socialMediaLoginButton"
      label={provider}
      isLoading={isLoading}
      handleSignIn={handleSignIn}
    />
  );
}

export default SociaMediaLoginForm;

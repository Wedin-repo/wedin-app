'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import AuthFormButton from './auth-form-button';

type SocialMediaLoginButtonType = {
  provider: 'google' | 'facebook';
  callbackUrl?: string;
};
function SociaMediaLoginButton({
  provider,
  callbackUrl = '/dashboard',
}: SocialMediaLoginButtonType) {
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

export default SociaMediaLoginButton;

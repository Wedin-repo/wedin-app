import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import * as React from 'react';

export default function SignInGoogle() {
  const [isLoading, setisLoading] = React.useState(false);

  const handleSignIn = async () => {
    setisLoading(true);
    await signIn('google', {
      callbackUrl: `${window.location.origin}/onboarding`,
    });
    setisLoading(false);
  };

  return (
    <Button
      disabled={isLoading}
      onClick={handleSignIn}
      className="bg-secondaryBackgroundColor text-tertiaryTextColor py-1.5 px-6 rounded-lg w-[208px] hover:opacity-80 transition-all"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Google'}
    </Button>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { signIn } from '@/auth';

export default function SingInFacebook() {
  return (
    <Button
      onClick={() =>
        signIn('facebook', {
          callbackUrl: `${window.location.origin}/onboarding`,
        })
      }
      className="bg-secondaryBackgroundColor text-tertiaryTextColor py-1.5 px-6 rounded-lg w-[208px] hover:opacity-80 transition-all"
    >
      Facebook
    </Button>
  );
}

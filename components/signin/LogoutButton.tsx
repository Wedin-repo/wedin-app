'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <Button
      className="bg-black text-white py-1.5 px-6 rounded-lg"
      onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}
    >
      Log out
    </Button>
  );
}

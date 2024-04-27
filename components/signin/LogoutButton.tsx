'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';

export default function LogoutButton() {
  return (
    <Button
      className="bg-black text-white py-1.5 px-6 rounded-lg"
      onClick={signOut}
    >
      Log out
    </Button>
  );
}

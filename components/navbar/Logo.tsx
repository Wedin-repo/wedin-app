'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="logo"
      onClick={() => router.push('/')}
      className="cursor-pointer hidden sm:block"
      height="39"
      width="90"
      src="/images/wedin.svg"
    />
  );
};

export default Logo;

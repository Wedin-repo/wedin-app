'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type LogoProps = {
  height?: number;
  width?: number;
};

const Logo = ({ height = 38, width = 132 }: LogoProps) => {
  const router = useRouter();

  return (
    <Image
      alt="logo"
      onClick={() => router.push('/gifts')}
      className="cursor-pointer"
      height={height}
      width={width}
      src="/images/wedin.svg"
    />
  );
};

export default Logo;

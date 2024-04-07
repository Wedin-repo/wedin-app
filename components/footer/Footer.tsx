'use client';

import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/onboarding') ) {
    return <></>;
  }
  return (
    <div className='bg-[#333333] w-full h-[90px] flex items-center justify-center font-medium text-xl text-white'>
        wedin
    </div>
  )
}

export default Footer
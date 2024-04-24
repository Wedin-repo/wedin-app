'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { MdErrorOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';


type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

const EmptyState: FC<Props> = ({
  title = '',
  subtitle = '',
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[50vh] sm:h-[60vh] flex flex-col gap-2 justify-center items-center">
      <div className='flex flex-col items-center gap-4'>
        <div className='h-36 w-36 bg-[#D9D9D9] rounded-full flex justify-center items-center'>
          <MdErrorOutline fontSize={'66px'} />
        </div>
        <h1 className="text-3xl font-normal text-black max-w-sm text-center">{title}</h1>
      </div>

      <div className="mt-6">
        {showReset && (
          <Button variant="emptyStateButton" size='emptyStateButton' onClick={() => router.push('/gifts')}>
            Agregá un regalo ahora
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { MdErrorOutline } from 'react-icons/md';

type EmptyStateProps = {
  title?: string;
  showReset?: boolean;
  tryAgain?: boolean;
};

const EmptyState = ({ title = '', showReset, tryAgain }: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-[50vh] sm:h-[78vh]">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex justify-center items-center w-36 h-36 rounded-full bg-borderColor">
          <MdErrorOutline fontSize={'66px'} />
        </div>
        <h1 className="max-w-sm text-3xl font-normal text-center text-black">
          {title}
        </h1>
      </div>

      {tryAgain && (
        <div className="mt-6">
          <Button
            variant="emptyStateButton"
            size="emptyStateButton"
            onClick={() => router.push('/dashboard?page=1')}
          >
            Volver al inicio
          </Button>
        </div>
      )}

      <div className="mt-6">
        {showReset && (
          <Button
            variant="emptyStateButton"
            size="emptyStateButton"
            onClick={() => router.push('/gifts')}
          >
            Agregá un regalo ahora
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

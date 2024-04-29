'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { MdErrorOutline } from 'react-icons/md';

type EmptyStateProps = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  tryAgain?: boolean;
};

const EmptyState = ({
  title = '',
  subtitle = '',
  showReset,
  tryAgain,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="h-[50vh] sm:h-[60vh] flex flex-col gap-2 justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-36 w-36 bg-borderColor rounded-full flex justify-center items-center">
          <MdErrorOutline fontSize={'66px'} />
        </div>
        <h1 className="text-3xl font-normal text-black max-w-sm text-center">
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

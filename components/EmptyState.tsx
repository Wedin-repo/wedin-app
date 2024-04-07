'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import Heading from './Heading';

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

const EmptyState: FC<Props> = ({
  title = 'Something bad happened',
  subtitle = 'Try changing yourself',
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button variant="outline" onClick={() => router.push('/')}>
            Volver al inicio
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

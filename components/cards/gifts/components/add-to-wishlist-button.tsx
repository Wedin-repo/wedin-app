'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GrUndo } from 'react-icons/gr';
import { IoAdd } from 'react-icons/io5';

type WishListFormButtonProps = {
  variant?: string;
};

function WishListFormButton({ variant }: WishListFormButtonProps) {
  const { pending } = useFormStatus();

  if (variant === 'undoButton') {
    return (
      <Button
        type="submit"
        variant="undoButton"
        disabled={pending}
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <GrUndo />}
        Deshacer
      </Button>
    );
  }

  if (variant === 'deleteIconButton') {
    return (
      <Button
        type="submit"
        variant="deleteIconButton"
        size="iconButton"
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FaRegTrashAlt fontSize={'16px'} />
        )}
      </Button>
    );
  }

  return (
    <Button type="submit" variant="primaryButton" disabled={pending}>
      Agregar a mi lista
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <IoAdd size={22} />
      )}
    </Button>
  );
}

export default WishListFormButton;

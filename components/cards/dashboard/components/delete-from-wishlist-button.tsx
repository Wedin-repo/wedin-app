'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { FaRegTrashAlt } from 'react-icons/fa';

type DeleteFromWishListButtonProps = {
  title?: string | null;
};

function DeleteFromWishListButton({ title }: DeleteFromWishListButtonProps) {
  const { pending } = useFormStatus();

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
        <>
          {title ?? title}
          <FaRegTrashAlt fontSize={'16px'} />
        </>
      )}
    </Button>
  );
}

export default DeleteFromWishListButton;

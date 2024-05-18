'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { GoArrowRight } from 'react-icons/go';
import { GrUndo } from 'react-icons/gr';
import { IoAdd } from 'react-icons/io5';

type WishlistFormButtonProps = {
  variant?: string;
};

function WishlistFormButton({ variant }: WishlistFormButtonProps) {
  const { pending } = useFormStatus();

  if (variant === 'undoButton') {
    return (
      <Button type="submit" variant="undoButton" disabled={pending}>
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <GrUndo />}
        Deshacer
      </Button>
    );
  }

  if (variant === 'deleteGiftIconButton') {
    return (
      <Button
        type="submit"
        variant="deleteGiftIconButton"
        size="iconButton"
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FaRegTrashAlt fontSize={'16px'} />
        )}
      </Button>
    );
  }

  if (variant === 'chooseGiftlistButton') {
    return (
      <Button
        type="submit"
        variant="chooseGiftlistButton"
        size="chooseGiftlistButton"
        disabled={pending}
      >
        Elegir lista
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <GoArrowRight fontSize={'24px'} />
        )}
      </Button>
    );
  }

  if (variant === 'editGiftButton') {
    return (
      <Button type="submit" variant="editGiftButton" disabled={pending}>
        Guardar
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FiEdit3 fontSize={'16px'} />
        )}
      </Button>
    );
  }

  if (variant === 'deleteGiftButton') {
    return (
      <Button type="submit" variant="deleteGiftButton" disabled={pending}>
        Eliminar regalo
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
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
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <IoAdd size={22} />
      )}
    </Button>
  );
}

export default WishlistFormButton;

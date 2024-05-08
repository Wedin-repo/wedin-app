'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FiEdit3 } from 'react-icons/fi';

type EditGiftFromWishListFormProps = {
  isLoading?: boolean;
};

function EditGiftFromWishListForm({
  isLoading,
}: EditGiftFromWishListFormProps) {
  return (
    <Button type="submit" variant="editGiftButton" disabled={isLoading}>
      Editar regalo
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <FiEdit3 fontSize={'16px'} />
      )}
    </Button>
  );
}

export default EditGiftFromWishListForm;

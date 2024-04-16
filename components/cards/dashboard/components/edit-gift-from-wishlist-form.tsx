'use client';

import { Button } from '@/components/ui/button';
import { FiEdit3 } from 'react-icons/fi';

function EditGiftFromWishListForm() {

  return (
    <Button type="submit" variant="editGiftButton">
      Editar regalo
      <FiEdit3 fontSize={'16px'} />
    </Button>
  );
}

export default EditGiftFromWishListForm;

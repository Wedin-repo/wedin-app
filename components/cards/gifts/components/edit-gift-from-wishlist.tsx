'use client';

import { Button } from '@/components/ui/button';
import { FiEdit3 } from 'react-icons/fi';

type EditGiftFromWishListProps = {
  giftId: string;
  wishlistId?: string | null;
};

function EditGiftFromWishList({
  giftId,
  wishlistId,
}: EditGiftFromWishListProps) {
  const handleRemoveGiftFromWishList = async (formData: FormData) => {
    console.log('first');
  };

  return (
    // In the HTML form the action throw an error that the form was
    // submitted. Fix this is possible, does not seem to affect functionality
    <form action={handleRemoveGiftFromWishList} id={giftId}>
      <input id="giftId" type="hidden" name="content" value={giftId} />
      <Button type="submit" variant="editIconButton" size="iconButton">
        <FiEdit3 fontSize={'16px'} />
      </Button>
    </form>
  );
}

export default EditGiftFromWishList;

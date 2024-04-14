'use client';

import { deleteGiftFromWishList } from '@/actions/delete-gift-from-wishlist';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';

type RemoveFromWishListFormProps = {
  giftId: string;
  wishlistId?: string | null;
};

function RemoveFromWishListForm({ giftId, wishlistId }: RemoveFromWishListFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleRemoveGiftFromWishList = async (formData: FormData) => {
    if (!wishlistId) {
      router.push('/register');
      return;
    }

    const removeFromWishListWithId = deleteGiftFromWishList.bind(null, wishlistId);
    const response = await removeFromWishListWithId(formData);

    toast({
      title: response.status,
      description: response.message,
      action: (
        <FaCheck
          color={response.status === 'Error' ? 'red' : 'green'}
          fontSize="36px"
        />
      ),
      className: 'bg-white',
    });
  };

  return (
    // In the HTML form the action throw an error that the form was
    // submitted. Fix this is possible, does not seem to affect functionality
    <form action={handleRemoveGiftFromWishList} id={giftId}>
      <input id="giftId" type="hidden" name="content" value={giftId} />
      <Button type="submit" variant="deleteIconButton" size='iconButton'>
        <FaRegTrashAlt fontSize={'16px'} />
      </Button>
    </form>
  );
}

export default RemoveFromWishListForm;

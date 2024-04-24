'use client';

import { deleteGiftFromWishList } from '@/actions/delete-gift-from-wishlist';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { FaRegTrashAlt } from 'react-icons/fa';
import DeleteFromWishListButton from '@/components/cards/dashboard/components/delete-from-wishlist-button';

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
        <FaRegTrashAlt
          fontSize="46px"
        />
      ),
      className: 'bg-white',
    });
  };

  return (
    <form action={handleRemoveGiftFromWishList} id={giftId}>
      <input id="giftId" type="hidden" name="content" value={giftId} />
      <DeleteFromWishListButton />
    </form>
  );
}

export default RemoveFromWishListForm;

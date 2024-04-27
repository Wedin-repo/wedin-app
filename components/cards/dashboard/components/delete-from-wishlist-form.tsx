'use client';

import { deleteGiftFromWishList } from '@/actions/delete-gift-from-wishlist';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import AddToWishListForm from '@/components/cards/gifts/components/add-to-wishlist-form';
import WishListFormButton from '../../gifts/components/wishlist-form-button';

type RemoveFromWishListFormProps = {
  giftId: string;
  wishlistId?: string | null;
};

function RemoveFromWishListForm({
  giftId,
  wishlistId,
}: RemoveFromWishListFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleRemoveGiftFromWishList = async (formData: FormData) => {
    if (!wishlistId) {
      router.push('/register');
      return;
    }

    const removeFromWishListWithId = deleteGiftFromWishList.bind(
      null,
      wishlistId
    );
    const response = await removeFromWishListWithId(formData);

    toast({
      title: response.status,
      description: response.message,
      action: (
        <AddToWishListForm
          giftId={giftId}
          wishlistId={wishlistId}
          variant='undoButton'
        />
      ),
      className: 'bg-white',
    });
  };

  return (
    <form action={handleRemoveGiftFromWishList} id={giftId}>
      <input id="giftId" type="hidden" name="content" value={giftId} />
      <WishListFormButton variant='deleteIconButton' />
    </form>
  );
}

export default RemoveFromWishListForm;

'use client';

import { addGiftsToWishList } from '@/actions/data/wishlist';
import WishListFormButton from '@/components/cards/gifts/components/wishlist-form-button';
import { useToast } from '@/components/ui/use-toast';
import { redirect, useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';

type AddToWishlistFormProps = {
  giftIds?: string[];
  wishlistId?: string | null;
};

function AddToWishlistForm({ giftIds, wishlistId }: AddToWishlistFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddGiftsToWishList = async (formData: FormData) => {
    if (!wishlistId) return redirect('/login');
    if (!giftIds) throw new Error('Something went wrong');

    const addToWishListWithId = addGiftsToWishList.bind(null, wishlistId);
    const response = await addToWishListWithId(formData);

    if (response?.status === 'Error') {
      toast({
        title: response.status,
        description: response.message,
        action: <FaCheck color="red" fontSize={'36px'} />,
        className: 'bg-white',
      });

      return null;
    }

    router.push('/dashboard');
  };
  return (
    <form action={handleAddGiftsToWishList}>
      <input id="giftIds" type="hidden" name="giftIds" value={giftIds} />
      <WishListFormButton variant="chooseGiftListButton" />
    </form>
  );
}

export default AddToWishlistForm;

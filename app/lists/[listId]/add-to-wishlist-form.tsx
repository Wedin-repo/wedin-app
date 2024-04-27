'use client';

import { addGiftsToWishList } from '@/actions/add-gifts-to-wishlist';
import WishListFormButton from '@/components/cards/gifts/components/wishlist-form-button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';

type AddToWishlistFormProps = {
  giftIds?: string[];
  wishlistId?: string | null;
};

function AddToWishlistForm({ giftIds, wishlistId }: AddToWishlistFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddGiftsToWishList = async (formData: FormData) => {
    if (!wishlistId) return redirect('/register');
    if (!giftIds) throw new Error('Something went wrong');

    const addToWishListWithId = addGiftsToWishList.bind(null, wishlistId);
    const response = await addToWishListWithId(formData);

    if (response.status === 'Error') {
      toast({
        title: response.status,
        description: response.message,
        action: <FaCheck color="red" fontSize={'36px'} />,
        className: 'bg-white',
      });

      throw new Error('Failed to add gift to wishlist');
    }

    router.push('/dashboard');
  };
  return (
    <form action={handleAddGiftsToWishList}>
      <input id="giftIds" type="hidden" name="giftId" value={giftIds} />
      <WishListFormButton variant="chooseGiftListButton" />
    </form>
  );
}

export default AddToWishlistForm;

'use client';

import { addGiftsToWishList } from '@/actions/data/wishlist';
import WishListFormButton from '@/components/cards/gifts/components/wishlist-form-button';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { redirect, useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { IoGiftOutline } from 'react-icons/io5';

type AddToWishlistFormProps = {
  giftIds?: string[];
  wishlistId?: string | null;
};

function AddToWishlistForm({ giftIds, wishlistId }: AddToWishlistFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddGiftsToWishList = async (formData: FormData) => {
    if (!giftIds || !wishlistId) throw new Error('Something went wrong');

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
    } else {
      toast({
        title: 'Lista agregada',
        description: `Se agregaron ${giftIds?.length} regalos a tu lista`,
        action: (
          <Button
            onClick={() => router.push('/dashboard?page=1')}
            variant="outline"
            className="gap-1 px-3 h-8 hover:text-white border-borderColor hover:bg-primaryBackgroundColor"
          >
            <IoGiftOutline />
            Ver lista
          </Button>
        ),
        className: 'bg-white',
      });
    }

    router.push('/gifts?tab=predefinedGifts');
  };
  return (
    <form action={handleAddGiftsToWishList}>
      <input id="giftIds" type="hidden" name="giftIds" value={giftIds} />
      <WishListFormButton variant="chooseGiftListButton" />
    </form>
  );
}

export default AddToWishlistForm;

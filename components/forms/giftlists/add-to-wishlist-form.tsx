'use client';

import { addGiftsToWishList } from '@/actions/data/wishlist-gifts';
import WishListFormButton from '@/components/forms/shared/wishlist-form-button';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { WishListGiftsCreateSchema } from '@/schemas/forms';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { IoGiftOutline } from 'react-icons/io5';

type AddToWishlistFormProps = {
  giftIds?: string[];
  wishlistId?: string;
};

function AddToWishlistForm({ giftIds, wishlistId }: AddToWishlistFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddGiftsToWishList = async () => {
    const validatedFields = WishListGiftsCreateSchema.safeParse({
      giftIds,
      wishlistId,
    });

    if (!validatedFields.success) {
      router.push('/register');
      return;
    }

    const response = await addGiftsToWishList(validatedFields.data);

    if (response?.error) {
      toast({
        title: 'Error 🎁🚫',
        description: response.error,
        variant: 'destructive',
        action: <FaCheck color="red" fontSize={'36px'} />,
      });

      return;
    }

    toast({
      title: 'Lista agregada! 🎁🎉',
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

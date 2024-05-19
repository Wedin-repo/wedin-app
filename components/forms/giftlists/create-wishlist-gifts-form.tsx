'use client';

import { createWishlistGifts } from '@/actions/data/wishlist-gifts';
import WishlistFormButton from '@/components/forms/shared/wishlist-form-button';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { WishlistGiftsCreateSchema } from '@/schemas/form';
import type { Event } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { IoGiftOutline } from 'react-icons/io5';

type AddToWishlistFormProps = {
  giftIds?: string[];
  event: Event | null;
};

function CreateWishlistGiftsForm({ giftIds, event }: AddToWishlistFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddGiftsTowishlist = async () => {
    const validatedFields = WishlistGiftsCreateSchema.safeParse({
      giftIds,
      wishlistId: event?.wishlistId,
      eventId: event?.id,
    });

    if (!validatedFields.success) {
      router.push('/register');
      return;
    }

    const response = await createWishlistGifts(validatedFields.data);

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

    router.push('/gifts?tab=predefinedGiftlists');
  };
  return (
    <form action={handleAddGiftsTowishlist}>
      <input id="giftIds" type="hidden" name="giftIds" value={giftIds} />
      <WishlistFormButton variant="chooseGiftlistButton" />
    </form>
  );
}

export default CreateWishlistGiftsForm;

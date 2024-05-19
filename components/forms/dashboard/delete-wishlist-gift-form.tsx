'use client';

import { deleteGiftFromWishlist } from '@/actions/data/wishlist-gifts';
import WishlistFormButton from '@/components/forms/shared/wishlist-form-button';
import { useToast } from '@/components/ui/use-toast';
import { WishlistGiftDeleteSchema } from '@/schemas/form';
import { useRouter } from 'next/navigation';
import CreateWishlistGiftForm from '../shared/create-wishlist-gift-with-gift-form';
import type { Event } from '@prisma/client';

type DeleteFromWishlistFormProps = {
  giftId: string;
  event?: Event | null;
  variant?: string;
};

function DeleteWishlistGiftForm({
  giftId,
  event,
  variant = 'deleteGiftIconButton',
}: DeleteFromWishlistFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleRemoveGiftFromwishlist = async () => {
    if (!event) {
      router.push('/register');
      return;
    }

    const validatedFields = WishlistGiftDeleteSchema.safeParse({
      giftId,
      wishlistId: event.wishlistId,
    });

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Error al eliminar el regalo de la lista',
        variant: 'destructive',
      });

      return;
    }

    const response = await deleteGiftFromWishlist(validatedFields.data);

    if (response?.error) {
      toast({
        title: 'Error',
        description: response.error,
        variant: 'destructive',
      });

      return;
    }

    toast({
      title: 'Éxito! 🎁🗑',
      description: 'Regalo eliminado de tu lista',
      className: 'bg-white',
      action: (
        <CreateWishlistGiftForm
          event={event}
          giftId={giftId}
          variant="undoButton"
        />
      ),
    });
  };

  return (
    <form action={handleRemoveGiftFromwishlist} id={giftId}>
      <input id="giftId" type="hidden" name="content" value={giftId} />
      <WishlistFormButton variant={variant} />
    </form>
  );
}

export default DeleteWishlistGiftForm;

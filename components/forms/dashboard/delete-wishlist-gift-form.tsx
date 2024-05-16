'use client';

import { deleteGiftFromWishList } from '@/actions/data/wishlist-gifts';
import WishListFormButton from '@/components/forms/shared/wishlist-form-button';
import { useToast } from '@/components/ui/use-toast';
import { WishListGiftDeleteSchema } from '@/schemas/form';
import { useRouter } from 'next/navigation';
import CreateWishlistGiftForm from '../shared/create-wishlist-gift-form';

type RemoveFromWishListFormProps = {
  giftId: string;
  wishlistId?: string | null;
  variant?: string;
};

function DeleteWishlistGiftForm({
  giftId,
  wishlistId,
  variant = 'deleteGiftIconButton',
}: RemoveFromWishListFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleRemoveGiftFromWishList = async () => {
    if (!wishlistId) {
      router.push('/register');
      return;
    }

    const validatedFields = WishListGiftDeleteSchema.safeParse({
      giftId,
      wishlistId,
    });

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Error al eliminar el regalo de la lista',
        variant: 'destructive',
      });

      return;
    }

    const response = await deleteGiftFromWishList(validatedFields.data);

    if (response?.error) {
      toast({
        title: 'Error',
        description: response.error,
        variant: 'destructive',
        className: 'bg-white',
      });

      return;
    }

    toast({
      title: 'Éxito! 🎁🗑',
      description: 'Regalo eliminado de tu lista',
      action: (
        <CreateWishlistGiftForm
          giftId={giftId}
          wishlistId={wishlistId}
          variant="undoButton"
        />
      ),
    });
  };

  return (
    <form action={handleRemoveGiftFromWishList} id={giftId}>
      <input id="giftId" type="hidden" name="content" value={giftId} />
      <WishListFormButton variant={variant} />
    </form>
  );
}

export default DeleteWishlistGiftForm;

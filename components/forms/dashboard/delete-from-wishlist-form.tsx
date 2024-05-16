'use client';

import { deleteGiftFromWishList } from '@/actions/data/wishlist-gifts';
import AddToWishListForm from '@/components/forms/shared/add-to-wishlist-form';
import WishListFormButton from '@/components/forms/shared/wishlist-form-button';
import { useToast } from '@/components/ui/use-toast';
import { WishListGiftDeleteSchema } from '@/schemas/forms';
import { useRouter } from 'next/navigation';

type RemoveFromWishListFormProps = {
  giftId: string;
  wishlistId?: string | null;
  variant?: string;
};

function RemoveFromWishListForm({
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
        <AddToWishListForm
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

export default RemoveFromWishListForm;

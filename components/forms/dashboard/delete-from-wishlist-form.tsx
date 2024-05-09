'use client';

import { deleteGiftFromWishList } from '@/actions/data/wishlist';
import AddToWishListForm from '@/components/cards/gifts/components/add-to-wishlist-form';
import WishListFormButton from '@/components/cards/gifts/components/wishlist-form-button';
import { useToast } from '@/components/ui/use-toast';
import { RemoveGiftFromWishListSchema } from '@/schemas/forms';
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

    const validatedFields = RemoveGiftFromWishListSchema.safeParse({
      giftId: giftId,
      wishlistId: wishlistId,
    });

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Error al eliminar el regalo de la lista',
        className: 'bg-white',
      });

      return;
    }

    const response = await deleteGiftFromWishList(validatedFields.data);

    if (response.status === 'Error') {
      toast({
        title: 'Error',
        description:
          response.message ||
          'An error occurred while deleting the gift from the wishlist.',
        className: 'bg-white',
      });
    }

    toast({
      title: response.status,
      description: response.message,
      action: (
        <AddToWishListForm
          giftId={giftId}
          wishlistId={wishlistId}
          variant="undoButton"
        />
      ),
      className: 'bg-white',
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

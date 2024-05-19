import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { WishlistGiftCreateSchema } from '@/schemas/form';
import { redirect, useRouter } from 'next/navigation';
import { IoGiftOutline } from 'react-icons/io5';
import WishlistFormButton from './wishlist-form-button';

import { createWishlistGift } from '@/actions/data/wishlist-gifts';
type AddTowishlistFormProps = {
  giftId: string;
  isFavoriteGift?: boolean;
  isGroupGift?: boolean;
  variant?: string;
  wishlistId?: string | null;
  setIsOpen?: (value: boolean) => void;
};

function CreateWishlistGiftForm({
  giftId,
  isFavoriteGift = false,
  isGroupGift = false,
  variant,
  wishlistId,
  setIsOpen,
}: AddTowishlistFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddGiftTowishlist = async () => {
    const validatedFields = WishlistGiftCreateSchema.safeParse({
      wishlistId,
      giftId,
    });

    if (!validatedFields.success) {
      return redirect('/register');
    }

    const response = await createWishlistGift({
      ...validatedFields.data,
      isFavoriteGift,
      isGroupGift,
    });

    if (response?.error) {
      toast({
        title: 'Error',
        description: response.error,
        variant: 'destructive',
      });

      return;
    }

    if (variant !== 'undoButton') {
      toast({
        title: 'Exito! 🎁🎉',
        description: 'Regalo creado y agregado a tu lista.',
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

    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <form action={handleAddGiftTowishlist}>
      <input id="giftId" type="hidden" name="giftId" value={giftId} />
      <WishlistFormButton variant={variant} />
    </form>
  );
}

export default CreateWishlistGiftForm;

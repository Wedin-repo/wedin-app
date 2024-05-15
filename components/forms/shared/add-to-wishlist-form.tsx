import { addGiftToWishList } from '@/actions/data/wishlist-gifts';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GiftWishListSchema } from '@/schemas/forms';
import { redirect, useRouter } from 'next/navigation';
import { IoGiftOutline } from 'react-icons/io5';
import WishListFormButton from './wishlist-form-button';

type AddToWishListFormProps = {
  giftId: string;
  variant?: string;
  wishlistId?: string | null;
  setIsOpen?: (value: boolean) => void;
};

function AddToWishListForm({
  giftId,
  wishlistId,
  setIsOpen,
  variant,
}: AddToWishListFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddGiftToWishList = async () => {
    const validatedFields = GiftWishListSchema.safeParse({
      wishlistId,
      giftId,
    });

    if (!validatedFields.success) {
      return redirect('/register');
    }

    const response = await addGiftToWishList(validatedFields.data);

    if (variant !== 'undoButton') {
      toast({
        title: response.status,
        description: response.message,
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
    <form action={handleAddGiftToWishList}>
      <input id="giftId" type="hidden" name="giftId" value={giftId} />
      <WishListFormButton variant={variant} />
    </form>
  );
}

export default AddToWishListForm;

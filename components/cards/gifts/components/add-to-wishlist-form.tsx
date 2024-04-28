import { addGiftToWishList } from '@/actions/add-gift-to-wishlist';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { redirect } from 'next/navigation';
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
  const { toast } = useToast();

  const handleAddGiftToWishList = async (formData: FormData) => {
    if (!wishlistId) return redirect('/register');

    const addToWishListWithId = addGiftToWishList.bind(null, wishlistId);
    const response = await addToWishListWithId(formData);

    if (variant !== 'undoButton') {
      toast({
        title: response.status,
        description: response.message,
        action: (
          <Button
            onClick={() => (window.location.href = '/dashboard')}
            variant="outline"
            className="gap-1 h-8 border-borderColor px-3 hover:bg-primaryBackgroundColor hover:text-white"
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

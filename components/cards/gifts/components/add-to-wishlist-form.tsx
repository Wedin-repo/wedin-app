import { addGiftToWishList } from '@/actions/add-gift-to-wishlist';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { redirect, useRouter } from 'next/navigation';
import { IoGiftOutline } from 'react-icons/io5';
import AddToWishListButton from './add-to-wishlist-button';

type AddToWishListFormProps = {
  giftId: string;
  wishlistId?: string | null;
  setIsOpen: (value: boolean) => void;
};

function AddToWishListForm({
  giftId,
  wishlistId,
  setIsOpen,
}: AddToWishListFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddGiftToWishList = async (formData: FormData) => {
    if (!wishlistId) return redirect('/register');

    const addToWishListWithId = addGiftToWishList.bind(null, wishlistId);
    const response = await addToWishListWithId(formData);

    toast({
      title: response.status,
      description: response.message,
      action: (
        <Button
          onClick={() => router.push('/dashboard')}
          variant="outline"
          className="gap-1 h-8 border-borderColor px-3 hover:bg-primaryBackgroundColor hover:text-white"
        >
          <IoGiftOutline />
          Ver lista
        </Button>
      ),
      className: 'bg-white',
    });
    setIsOpen(false);
  };

  return (
    <form action={handleAddGiftToWishList}>
      <input id="giftId" type="hidden" name="giftId" value={giftId} />
      <AddToWishListButton />
    </form>
  );
}

export default AddToWishListForm;

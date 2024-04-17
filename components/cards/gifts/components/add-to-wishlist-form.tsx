'use client';

import { addGiftToWishList } from '@/actions/add-gift-to-wishlist';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';

type AddToWishListFormProps = {
  giftId: string;
  wishlistId?: string | null;
};

function AddToWishListForm({ giftId, wishlistId }: AddToWishListFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleAddGiftToWishList = async (formData: FormData) => {
    if (!wishlistId) {
      router.push('/register');
      return;
    }

    const addToWishListWithId = addGiftToWishList.bind(null, wishlistId);
    const response = await addToWishListWithId(formData);

    toast({
      title: response.status,
      description: response.message,
      action: (
        <FaCheck
          color={response.status === 'Error' ? 'red' : 'green'}
          fontSize="36px"
        />
      ),
      className: 'bg-white',
    });
  };

  return (
    <form action={handleAddGiftToWishList}>
      <input id="giftId" type="hidden" name="giftId" value={giftId} />
      <Button type="submit" variant="primaryButton">
        Añadir a mi lista
        <IoAdd size={22} />
      </Button>
    </form>
  );
}

export default AddToWishListForm;

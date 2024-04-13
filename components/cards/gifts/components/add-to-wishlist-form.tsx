'use client';

import { addGiftToWishList } from '@/actions/AddGiftToWishlist';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';

type AddToWishListFormProps = {
  giftId: string;
  wishlistId: string | null | undefined;
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
    // In the HTML form the action throw an error that the form was
    // submitted. Fix this is possible, does not seem to affect functionality
    <form action={handleAddGiftToWishList} id={giftId}>
      <input id="giftId" type="hidden" name="content" value={giftId} />
      <Button type="submit" variant="primaryButton">
        Añadir a mi lista server
        <IoAdd size={22} />
      </Button>
    </form>
  );
}

export default AddToWishListForm;

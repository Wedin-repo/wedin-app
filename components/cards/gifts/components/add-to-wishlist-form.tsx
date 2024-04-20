'use client';

import { addGiftToWishList } from '@/actions/add-gift-to-wishlist';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { IoAdd, IoGiftOutline } from 'react-icons/io5';

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

    console.log(response);

    toast({
      title: response.status,
      description: response.message,
      action: (
        <Button
          onClick={() => router.push('/dashboard')}
          variant='outline'
          className='gap-1 h-8 border-borderColor px-3 hover:bg-primaryBackgroundColor hover:text-white'
        >
          <IoGiftOutline />
          Ver lista
        </Button>
      ),
      className: 'bg-white',
    });
  };

  return (
    <form action={handleAddGiftToWishList}>
      <input id="giftId" type="hidden" name="giftId" value={giftId} />
      <Button type="submit" variant="primaryButton">
        Agregar a mi lista
        <IoAdd size={22} />
      </Button>
    </form>
  );
}

export default AddToWishListForm;

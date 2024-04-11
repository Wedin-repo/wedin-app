'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';

type AddToWishlistButtonProps = {
  currentUser?: User | null;
  giftId: string;
  wishListId?: string | null;
};

function AddToWishlistButton({
  currentUser,
  giftId,
  wishListId,
}: AddToWishlistButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const addGiftToWishListHandler = async () => {
    if (!currentUser && !wishListId) {
      router.push('/register');
      return;
    }
    try {
      const response = await fetch(`/api/wishList/${wishListId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giftId,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Gift added to your wishlist.',
          action: <FaCheck color="green" fontSize={'36px'} />,
          className: 'bg-white',
        });
      } else {
        throw new Error('Failed to add gift to wishlist');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add gift to wishlist.',
        action: <FaCheck color="red" fontSize={'36px'} />,
        className: 'bg-white',
      });
    }
  };

  return (
    <>
      <Button variant="primaryButton" onClick={addGiftToWishListHandler}>
        Añadir a mi lista
        <IoAdd size={22} />
      </Button>
    </>
  );
}

export default AddToWishlistButton;

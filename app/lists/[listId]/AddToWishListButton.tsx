'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { User, WishList } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';
import { GoArrowRight } from 'react-icons/go';

type AddToWishListButtonProps = {
  currentUser: User | null;
  wishList: WishList | null;
  giftIds: string[] | undefined;
};

const AddToWishListButton = ({
  currentUser,
  wishList,
  giftIds,
}: AddToWishListButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  console.log(wishList);

  const addGiftsToWishList = async () => {
    setIsLoading(true);
    if (!currentUser || !wishList?.id) {
      console.log('User not logged in or wishList ID missing');
      router.push('/register');
      return;
    }
    try {
      const response = await fetch(`/api/gift/${wishList?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giftIds: giftIds,
        }),
      });
      if (response.ok) {
        console.log('Gifts added to wishlist successfully');
        toast({
          title: 'Success',
          description: 'Lista agregada a tu wishlist.',
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
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <Button
      onClick={addGiftsToWishList}
      variant="chooseGiftListButton"
      size="chooseGiftListButton"
    >
      Elegir lista <GoArrowRight fontSize={'24px'} />
    </Button>
  );
};

export default AddToWishListButton;

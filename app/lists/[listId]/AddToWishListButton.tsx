// TODO - Add to wishlist button
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';
import { GoArrowRight } from 'react-icons/go';
import { Loader2 } from 'lucide-react';

type AddToWishListButtonProps = {
  currentUser?: User | null;
  wishListId?: string | null;
  giftIds?: string[] | null;
};

const AddToWishListButton = ({
  currentUser,
  wishListId,
  giftIds,
}: AddToWishListButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const addGiftsToWishList = async () => {
    setIsLoading(true);
    if (!currentUser || !wishListId) {
      router.push('/register');
      return;
    }
    try {
      const response = await fetch(`/api/gift/${wishListId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giftIds: giftIds,
        }),
      });
      if (response.ok) {
        window.location.href = '/gifts?tab=predefinedGifts';
        // router.push('/dashboard');
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
      disabled={isLoading}
    >
      Elegir lista
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <GoArrowRight fontSize={'24px'} />
      )}
    </Button>
  );
};

export default AddToWishListButton;

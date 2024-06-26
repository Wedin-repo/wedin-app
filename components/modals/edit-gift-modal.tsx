'use client';

import EditWishlistGiftWithGiftForm from '@/components/forms/dashboard/edit-wishlist-gift-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { Category, Gift, WishlistGift } from '@prisma/client';
import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';

type EditGiftModalProps = {
  categories: Category[];
  eventId: string;
  wishlistGift: WishlistGift & { gift: Gift };
  wishlistId: string;
};

function EditGiftModal({
  categories,
  eventId,
  wishlistGift,
  wishlistId,
}: EditGiftModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="editIconButton" size="iconButton">
          <FiEdit3 fontSize={'16px'} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl ">
        <EditWishlistGiftWithGiftForm
          categories={categories}
          eventId={eventId}
          setIsOpen={setIsOpen}
          wishlistGift={wishlistGift}
          wishlistId={wishlistId}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditGiftModal;

'use client';

import TransactionForm from '@/components/forms/invitees/create-transaction-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { Gift, WishListGift } from '@prisma/client';
import { useState } from 'react';

type WishlistGiftModalProps = {
  wishlistGift: WishListGift & { gift: Gift };
  children: React.ReactNode;
};

function WishlistGiftModal({ wishlistGift, children }: WishlistGiftModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl ">
        <TransactionForm wishlistGift={wishlistGift} />
      </DialogContent>
    </Dialog>
  );
}

export default WishlistGiftModal;

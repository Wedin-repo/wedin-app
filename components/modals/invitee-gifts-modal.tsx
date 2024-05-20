'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import CreateTransactionForm from '../forms/invitees/create-transaction-form';
import type { Gift, WishlistGift, Transaction } from '@prisma/client';

type InviteeGiftModalProps = {
  children: React.ReactNode;
  wishlistGift: WishlistGift & { gift: Gift; transactions: Transaction[] };
};

function InviteeWishlistGiftModal({
  children,
  wishlistGift,
}: InviteeGiftModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl ">
        <CreateTransactionForm
          wishlistGift={wishlistGift}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

export default InviteeWishlistGiftModal;

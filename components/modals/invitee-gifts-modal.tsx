'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import CreateTransactionForm from '../forms/invitees/create-transaction-form';
import type { Gift, WishlistGift, Transaction } from '@prisma/client';
import Image from 'next/image';

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

      <DialogContent className="bg-white !rounded-2xl flex w-full">
        <div className="w-1/2">
          <Image
            width={600}
            height={600}
            src={wishlistGift.gift.imageUrl ?? ''}
            alt={'Wishlist Gift Image'}
            className="rounded-xl h-full w-full object-cover"
          />
        </div>
        <div className="w-1/2">
          <CreateTransactionForm
            wishlistGift={wishlistGift}
            setIsOpen={setIsOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteeWishlistGiftModal;

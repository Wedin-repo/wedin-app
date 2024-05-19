'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { Event, Gift, Transaction, WishlistGift } from '@prisma/client';
import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import EditTransactionForm from '../forms/edit-transaction-form';

type EditTransactionModalProps = {
  transaction: Transaction & {
    wishlistGift: WishlistGift & {
      gift: Gift;
      event: Event;
    };
  };
};

function EditTransactionModal({ transaction }: EditTransactionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="editIconButton" size="iconButton">
          <FiEdit3 fontSize={'16px'} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl ">
        <EditTransactionForm transaction={transaction} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default EditTransactionModal;

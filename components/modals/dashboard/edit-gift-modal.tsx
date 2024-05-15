'use client';

import EditGiftForm from '@/components/forms/dashboard/edit-gift-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { Category, Gift } from '@prisma/client';
import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';

type EditGiftModalProps = {
  gift: Gift;
  categories: Category[];
  wishlistId: string;
  eventId: string;
};

function EditGiftModal({
  gift,
  wishlistId,
  categories,
  eventId,
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
        <EditGiftForm
          gift={gift}
          eventId={eventId}
          categories={categories}
          wishlistId={wishlistId}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditGiftModal;

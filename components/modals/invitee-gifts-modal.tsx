'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

type WishlistGiftModalProps = {
  children: React.ReactNode;
  dialogContent: React.ReactNode;
};

function WishlistGiftModal({
  children,
  dialogContent,
}: WishlistGiftModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl ">
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}

export default WishlistGiftModal;

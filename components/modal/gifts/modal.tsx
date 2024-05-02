'use client';

import AddToWishListForm from '@/components/cards/gifts/components/add-to-wishlist-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import ringsLoader from '@/public/images/rings.svg';
import { formatPrice } from '@/utils/format';
import { Gift } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';

type GiftCardProps = {
  gift: Gift;
  wishlistId?: string | null;
  hideModal?: boolean;
  children: React.ReactNode;
};

function GiftModal({ gift, wishlistId, children }: GiftCardProps) {
  const { name, description, price, id, imageUrl } = gift;
  const formattedPrice = formatPrice(Number(price));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-white rounded-xl">
        <div className="flex flex-col gap-4 justify-center items-center pt-6 w-full sm:gap-8 lg:flex-row lg:pt-0">
          <div className="w-full lg:w-1/2">
            <Image
              src={imageUrl || ringsLoader}
              width={500}
              height={342}
              alt={gift.name}
              className="object-cover w-full rounded-xl border h-[242px] sm:h-[342px]"
            />
          </div>

          <div className="flex flex-col gap-4 justify-around w-full h-full lg:w-1/2">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-medium sm:text-2xl">{name}</h1>
              <p className="text-base text-secondaryTextColor">{description}</p>
            </div>

            <div className="flex flex-col gap-3 text-base sm:text-lg">
              <div className="flex justify-between items-center">
                <p>Marcar como el que más queremos ⭐️</p>
                <Switch id="favorite-gift" />
              </div>
              <div className="flex justify-between items-center">
                <p>Regalo grupal</p>
                <Switch id="group-gift" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-medium text-secondaryTitleColor">
                {formattedPrice}
              </span>
            </div>
            <AddToWishListForm
              giftId={id}
              wishlistId={wishlistId}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GiftModal;

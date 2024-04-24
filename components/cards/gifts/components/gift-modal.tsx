'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Gift } from '@prisma/client';
import { IoAdd } from 'react-icons/io5';
import AddToWishListForm from './add-to-wishlist-form';
import { formatPrice } from '@/utils/format';
import Image from 'next/image';
import ringsLoader from '@/public/images/rings.svg';
import { useState } from 'react';

type GiftCardModalProps = {
  gift: Gift;
  wishlistId: string;
};

function GiftCardModal({ gift, wishlistId }: GiftCardModalProps) {
  const { name, description, price, id, imageUrl } = gift;
  const formattedPrice = formatPrice(Number(price));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="primaryButton" onClick={() => setIsOpen(true)}>
          Ver regalo
          <IoAdd size={22} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-8 pt-6 lg:pt-0">
          <div className="w-full lg:w-1/2">
            <Image
              src={imageUrl || ringsLoader}
              width={500}
              height={342}
              alt={gift.name}
              className="border rounded-2xl h-[242px] sm:h-[342px] w-full object-cover shadow"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col h-full justify-evenly gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-primaryTextColor text-2xl sm:text-3xl font-medium">
                {name}
              </h1>
              <p className="text-secondaryTextColor text-md sm:text-lg">
                {description}
              </p>
            </div>

            <div className="flex flex-col text-primaryTextColor text-md sm:text-lg gap-3">
              <div className="flex items-center justify-between">
                <p>Marcar como el que más queremos ⭐️</p>
                <Switch id="favorite-gift" />
              </div>
              <div className="flex items-center justify-between">
                <p>Regalo grupal</p>
                <Switch id="group-gift" />
              </div>
              <span className="text-xl sm:text-2xl text-secondaryTitleColor font-medium">
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

export default GiftCardModal;

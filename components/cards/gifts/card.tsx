'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import ringsLoader from '@/public/images/rings.svg';
import { formatPrice } from '@/utils/format';
import { Gift } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import AddToWishListForm from './components/add-to-wishlist-form';

type GiftCardProps = {
  gift: Gift;
  wishlistId?: string | null;
  hideModal?: boolean;
};

function GiftCard({ gift, wishlistId }: GiftCardProps) {
  const { name, description, price, id, imageUrl } = gift;
  const formattedPrice = formatPrice(Number(price));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card>
          <CardHeader className="w-full flex items-center p-0">
            <Image
              src={imageUrl || ringsLoader}
              width={500}
              height={0}
              alt={gift.name}
              className="rounded-t-lg h-[252px] w-full object-cover"
            />
          </CardHeader>

          <CardContent className="p-4">
            <p className="text-primaryTitleColor font-medium text-sm">{name}</p>
            <p className="text-secondaryTextColor text-sm">{description}</p>
            <div className="flex flex-grow items-end justify-between text-primaryTitleColor">
              <p className="font-medium text-lg">{formattedPrice}</p>
              <FaChevronRight fontSize="22" className="pb-1 block sm:hidden" />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="bg-white rounded-xl">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-8 pt-6 lg:pt-0">
          <div className="w-full lg:w-1/2">
            <Image
              src={imageUrl || ringsLoader}
              width={500}
              height={342}
              alt={gift.name}
              className="border rounded-xl h-[242px] sm:h-[342px] w-full object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col h-full justify-around gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-2xl font-medium">{name}</h1>
              <p className="text-secondaryTextColor text-base">{description}</p>
            </div>

            <div className="flex flex-col text-base sm:text-lg gap-3">
              <div className="flex items-center justify-between">
                <p>Marcar como el que más queremos ⭐️</p>
                <Switch id="favorite-gift" />
              </div>
              <div className="flex items-center justify-between">
                <p>Regalo grupal</p>
                <Switch id="group-gift" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl text-secondaryTitleColor font-medium">
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

export default GiftCard;

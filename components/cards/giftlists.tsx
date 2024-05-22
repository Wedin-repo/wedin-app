import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { formatPrice } from '@/lib/utils';
import type { Gift, Giftlist } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

type GiftlistCardProps = {
  giftlist: Giftlist & { gifts: Gift[] };
};

async function GiftlistCard({ giftlist }: GiftlistCardProps) {
  const { name, totalPrice, quantity, id, gifts } = giftlist;
  const formattedPrice = formatPrice(Number(totalPrice));

  if (!gifts || gifts.length === 0) return null;

  return (
    <Card>
      <CardHeader className="relative p-0">
        <Carousel>
          <Link href={`/giftlists/${id}`}>
            <CarouselContent>
              {gifts?.map(gift => (
                <CarouselItem key={gift.id}>
                  <Image
                    src={gift.imageUrl || '../../../public/images/rings.svg'}
                    width={500}
                    height={0}
                    alt={gift.name}
                    className="object-cover w-full rounded-t-lg h-[252px]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Link>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="absolute right-0 top-2 py-1.5 px-5 mr-4 bg-white rounded-full">
          {quantity} regalos
        </div>
      </CardHeader>

      <Link href={`/giftlists/${id}`} className="flex flex-col flex-grow">
        <CardContent className="p-4">
          <p className="text-base text-secondaryTextColor">{name}</p>
          <div className="flex flex-grow justify-between items-end text-primaryTitleColor">
            <p className="text-lg">{formattedPrice}</p>
            <FaChevronRight fontSize="22" className="block pb-1 sm:hidden" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default GiftlistCard;

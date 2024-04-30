import { getGifts } from '@/actions/data/gift';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ringsLoader from '@/public/images/rings.svg';
import { formatPrice } from '@/utils/format';
import { GiftList } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

type GiftListCardProps = {
  giftList: GiftList;
};

async function GiftListCard({ giftList }: GiftListCardProps) {
  const { name, description, totalPrice, quantity, id } = giftList;
  const gifts = await getGifts({ searchParams: { giftListId: giftList.id } });
  const formattedPrice = formatPrice(Number(totalPrice));

  if (!gifts || gifts.length === 0) return null;

  return (
    <Card>
      <CardHeader className="relative p-0">
        <Carousel>
          <Link href={`/giftLists/${id}`}>
            <CarouselContent>
              {gifts?.map(gift => (
                <CarouselItem key={gift.id}>
                  <Image
                    src={gift.imageUrl || ringsLoader}
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

      <Link href={`/giftLists/${id}`} className="flex flex-col flex-grow">
        <CardContent className="p-4">
          <p className="text-lg text-secondaryTextColor">{name}</p>
          <p className="hidden text-sm text-secondaryTextColor">
            {description}
          </p>
          <div className="flex flex-grow justify-between items-end text-primaryTitleColor">
            <p className="text-lg">{formattedPrice}</p>
            <FaChevronRight fontSize="22" className="block pb-1 sm:hidden" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default GiftListCard;

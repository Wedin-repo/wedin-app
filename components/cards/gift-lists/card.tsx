import { getGifts } from '@/actions/getGifts';
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

  return (
    <Link href={`/lists/${id}`}>
      <Card>
        <CardHeader className="p-0 relative">
          <Carousel>
            <CarouselContent>
              {gifts?.map(gift => (
                <CarouselItem key={gift.id}>
                  <Image
                    src={gift.imageUrl || ringsLoader}
                    width={500}
                    height={0}
                    alt={gift.name}
                    className="rounded-t-lg h-[252px] w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="bg-white rounded-full px-5 py-1.5 absolute top-2 right-0 mr-4">
            {quantity} regalos
          </div>
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
    </Link>
  );
}

export default GiftListCard;

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import ringsLoader from '@/public/images/rings.svg';
import { Gift } from '@prisma/client';
import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';

type CardComponenetProps = {
  gift: Gift;
  hideModal?: boolean;
};

export default function GiftCard({
  gift,
  hideModal = false,
}: CardComponenetProps) {
  const { name, description, price, imageUrl } = gift;
  const formattedPrice = formatPrice(Number(price));

  return (
    <Card className={`${hideModal && 'cursor-auto'}`}>
      <CardHeader className="flex items-center p-0 w-full">
        <Image
          src={imageUrl || ringsLoader}
          width={500}
          height={500}
          alt={gift.name}
          className="object-cover w-full rounded-t-lg h-[252px]"
        />
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-base text-secondaryTextColor">{name}</p>
        <p className="hidden text-base text-secondaryTextColor">
          {description}
        </p>
        <div className="flex flex-grow justify-between items-end text-primaryTitleColor">
          <p className="text-lg">{formattedPrice}</p>
          <FaChevronRight fontSize="22" className="block pb-1 sm:hidden" />
        </div>
      </CardContent>
    </Card>
  );
}

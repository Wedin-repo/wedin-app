import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Gift } from '@prisma/client';
import GiftCardModal from './components/gift-modal';
import { formatPrice } from '@/utils/format';

type GiftCardProps = {
  gift: Gift;
  hideButton?: boolean;
};

async function GiftCard({ gift, hideButton = false }: GiftCardProps) {
  const { name, description, price, imageUrl } = gift;

  const formattedPrice = formatPrice(Number(price));

  return (
    <Card className="flex flex-col border-2 rounded-xl py-6 px-4 gap-4 max-w-[435px]">
      <CardHeader className="p-0">
        <div className='w-full flex items-center'>
          <img
            src={imageUrl?.toString()}
            height={212}
            alt={name}
            className='border rounded-2xl w-full h-[212px] sm:h-[252px] object-cover shadow'
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-1 w-full p-0">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-secondaryTextColor">{description}</p>
        <span className="text-secondaryTitleColor text-xl flex flex-grow items-end">
          {formattedPrice}
        </span>
      </CardContent>
      {!hideButton && (
        <CardFooter className="p-0">
          <GiftCardModal gift={gift} />
        </CardFooter>
      )}
    </Card>
  );
}

export default GiftCard;

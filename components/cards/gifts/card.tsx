import { Gift } from '@prisma/client';
import GiftCardModal from './components/gift-modal';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

type GiftCardProps = {
  gift: Gift;
};

async function GiftCard({ gift }: GiftCardProps) {
  const { name, description, price } = gift;

  return (
    <Card className="flex flex-col border-2 rounded-xl py-6 px-4 gap-5 max-w-[435px]">
      <CardHeader className="h-[212px] w-full bg-borderColor rounded-xl flex items-start justify-end">
        <div className=""></div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-1 w-full p-0 ">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>

        <p className="text-secondaryTextColor">{description}</p>
        <span className="text-secondaryTitleColor text-xl">Gs. {price}</span>
      </CardContent>
      <CardFooter className="p-0">
        <GiftCardModal gift={gift} />
      </CardFooter>
    </Card>
  );
}

export default GiftCard;

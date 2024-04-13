import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Gift } from '@prisma/client';
import GiftCardModal from './components/gift-modal';

type GiftCardProps = {
  gift: Gift;
  hideButton?: boolean;
};

async function GiftCard({ gift, hideButton = false }: GiftCardProps) {
  const { name, description, price } = gift;

  return (
    <Card className="flex flex-col border-2 rounded-xl py-6 px-4 gap-5 max-w-[435px]">
      <CardHeader className="p-0">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="border rounded-2xl w-full h-[212px] bg-secondaryBackgroundColor"></div>
            </CarouselItem>
            <CarouselItem>
              <div className="border rounded-2xl w-full h-[212px] bg-secondaryBackgroundColor"></div>
            </CarouselItem>
            <CarouselItem>
              <div className="border rounded-2xl w-full h-[212px] bg-secondaryBackgroundColor"></div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-1 w-full p-0 ">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-secondaryTextColor">{description}</p>
        <span className="text-secondaryTitleColor text-xl flex flex-grow items-end">
          Gs. {price}
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

import { Gift } from '@prisma/client';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from '@/components/ui/carousel';

type GiftCard = {
  gift: Gift;
};

const GiftCard = ({ gift }: GiftCard) => {
  const { name, description, price } = gift;
  return (
    <div className="border shadow-sm rounded-xl py-6 px-4 flex flex-col gap-4 max-w-[435px]">
      <div>
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
        {/* <div className="h-[212px] w-full bg-borderColor rounded-xl flex items-start justify-end"></div> */}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-sm">{description}</p>
      </div>

      <span className="text-black text-xl">Gs. {price}</span>
    </div>
  );
};

export default GiftCard;

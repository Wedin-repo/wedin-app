import { getCurrentUser } from '@/actions/getCurrentUser';
import { getWedding } from '@/actions/getWedding';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Gift } from '@prisma/client';
import { IoAdd } from 'react-icons/io5';
import AddToWishListForm from './add-to-wishlist-form';

type GiftCardModalProps = {
  gift: Gift;
};

function GiftCardModal({ gift }: GiftCardModalProps) {
  const { name, description, price, id } = gift;
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);

  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button variant="primaryButton">
          Añadir a mi lista
          <IoAdd size={22} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-8 pt-6 lg:pt-0">
          <div className="w-full lg:w-1/2">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div className="border rounded-2xl w-full h-[298px] sm:h-[358px] bg-secondaryBackgroundColor"></div>
                </CarouselItem>
                <CarouselItem>
                  <div className="border rounded-2xl w-full h-[298px] sm:h-[358px] bg-secondaryBackgroundColor"></div>
                </CarouselItem>
                <CarouselItem>
                  <div className="border rounded-2xl w-full h-[298px] sm:h-[358px] bg-secondaryBackgroundColor"></div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col h-full justify-evenly gap-6 lg:gap-0">
            <div>
              <h1 className="text-primaryTextColor text-3xl font-medium">
                {name}
              </h1>
              <p className="text-secondaryTextColor text-lg">{description}</p>
            </div>

            <div className="flex flex-col text-primaryTextColor text-lg gap-3">
              <div className="flex items-center justify-between space-x-2">
                <p>Marcar como el que más queremos ⭐️</p>
                <Switch id="favorite-gift" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <p>Regalo grupal</p>
                <Switch id="group-gift" />
              </div>
              <span className="text-3xl text-secondaryTitleColor font-medium">
                Gs. {price}
              </span>
            </div>
            <AddToWishListForm giftId={id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GiftCardModal;

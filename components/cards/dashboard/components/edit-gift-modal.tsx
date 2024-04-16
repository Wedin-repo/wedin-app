import { getCurrentUser } from '@/actions/getCurrentUser';
import { getWedding } from '@/actions/getWedding';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Gift } from '@prisma/client';
import EditGiftFromWishListForm from '@/components/cards/dashboard/components/edit-gift-from-wishlist-form';
import { Button } from '@/components/ui/button';
import { FiEdit3 } from 'react-icons/fi';
import EditGiftForm from './edit-gift-form';
import { getCategories } from '@/actions/getCategories';
import { getCategory } from '@/actions/getCategory';
import ImageUpload from '@/app/dashboard/components/image-upload';

type EditGiftModalProps = {
  gift: Gift;
};

async function EditGiftModal({ gift }: EditGiftModalProps) {
  const { name, description, price, id } = gift;
  const categories = await getCategories();

  const category = await getCategory({ searchParams: { categoryId: gift.categoryId } });

  //console.log(category);

  if (!categories) return null;
  
  //const currentUser = await getCurrentUser();
  //const wedding = await getWedding(currentUser?.id);

  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button type="submit" variant="editIconButton" size="iconButton">
          <FiEdit3 fontSize={'16px'} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-8 pt-6 lg:pt-0">
          <div className="w-full lg:w-1/2">
            <ImageUpload />
            {/* <Carousel>
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
            </Carousel> */}
          </div>

          <div className='w-full lg:w-1/2'>
            {categories && <EditGiftForm gift={gift} categories={categories} category={category} />}
            {/* <EditGiftFromWishListForm giftId={id} /> */}
          </div>
          
          
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditGiftModal;

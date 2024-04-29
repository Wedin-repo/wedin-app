import { getCategories, getCategory } from '@/actions/data/category';
import { getWedding } from '@/actions/data/wedding';
import { getCurrentUser } from '@/actions/getCurrentUser';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Gift } from '@prisma/client';
import { FiEdit3 } from 'react-icons/fi';
import EditGiftForm from './edit-gift-form';

type EditGiftModalProps = {
  gift: Gift;
};

async function EditGiftModal({ gift }: EditGiftModalProps) {
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);

  //const { name, description, price, id } = gift;
  const categories = await getCategories();

  const category = await getCategory({
    searchParams: { categoryId: gift.categoryId },
  });

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

      <DialogContent className="bg-white !rounded-2xl ">
        <div className="flex flex-col  lg:flex-row items-center justify-center w-full gap-4 sm:gap-8 pt-6 lg:pt-0">
          <div className="w-full lg:w-1/2">
            <ImageUpload />
          </div>

          <div className="w-full lg:w-1/2">
            <EditGiftForm
              gift={gift}
              categories={categories}
              category={category}
              wishlistId={wedding?.wishListId}
            />
            {/* <EditGiftFromWishListForm giftId={id} /> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditGiftModal;

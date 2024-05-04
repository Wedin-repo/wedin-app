import { getCategories, getCategory } from '@/actions/data/category';
import { getWedding } from '@/actions/data/wedding';
import { getCurrentUser } from '@/actions/getCurrentUser';
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

  if (!wedding?.wishListId) return null;

  const categories = await getCategories();

  /* const category = await getCategory({
    searchParams: { categoryId: gift.categoryId },
  }); */

  if (!categories) return null;

  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button type="submit" variant="editIconButton" size="iconButton">
          <FiEdit3 fontSize={'16px'} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl ">
        <EditGiftForm
          gift={gift}
          categories={categories}
          wishlistId={wedding?.wishListId}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditGiftModal;

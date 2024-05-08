import { getWedding } from '@/actions/data/wedding';
import { getCurrentUser } from '@/actions/getCurrentUser';
import CreateGiftForm from '@/components/cards/create-gift';
import { getCategories } from '@/actions/data/category';

async function CreateGift() {
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);
  const wishListId = wedding?.wishListId;
  if (!wishListId) return null;

  const categories = await getCategories();
  if (!categories) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <CreateGiftForm wishlistId={wishListId} categories={categories} />
    </div>
  );
}

export default CreateGift;

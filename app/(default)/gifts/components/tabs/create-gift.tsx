'use server';

import { getCategories } from '@/actions/data/category';
import { getWedding } from '@/actions/data/wedding';
import { getCurrentUser } from '@/actions/getCurrentUser';
import CreateGiftForm from '@/components/cards/create-gift';

async function CreateGift() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const wedding = await getWedding(currentUser.id);
  const wishListId = wedding?.wishListId;
  if (!wishListId) return null;

  const categories = await getCategories();
  if (!categories) return null;

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <CreateGiftForm wishlistId={wishListId} categories={categories} />
    </div>
  );
}

export default CreateGift;

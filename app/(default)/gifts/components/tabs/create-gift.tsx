'use server';

import { getCategories } from '@/actions/data/category';
import { getEvent } from '@/actions/data/event';
import CreateGiftForm from '@/components/forms/gifts/create-gift-form';

async function CreateGift() {
  const wedding = await getEvent();
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

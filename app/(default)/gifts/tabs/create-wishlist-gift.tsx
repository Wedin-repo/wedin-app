'use server';

import { getCategories } from '@/actions/data/category';
import { getEvent } from '@/actions/data/event';
import CreateWishlistGiftForm from '@/components/forms/gifts/create-wishlist-gift-with-gift-form';

async function CreateWishlistGift() {
  const event = await getEvent();
  if (!event) return null;

  const wishlistId = event.wishlistId;
  const categories = await getCategories();
  if (!categories) return null;

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <CreateWishlistGiftForm
        eventId={event.id}
        wishlistId={wishlistId}
        categories={categories}
      />
    </div>
  );
}

export default CreateWishlistGift;

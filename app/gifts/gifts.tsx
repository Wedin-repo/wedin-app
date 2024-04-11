import { getCurrentUser } from '@/actions/getCurrentUser';
import { GiftParams, getGifts } from '@/actions/gift/getGift';
import { getWeddingByUserId } from '@/actions/weddings/getWeddingByUserId';
import { getWishListByWeddingId } from '@/actions/wishList/getWishListByWeddingId';
import EmptyState from '@/components/EmptyState';
import GiftCard from '@/components/cards/gifts/GiftCard';

type GiftsProps = {
  searchParams: GiftParams;
};

async function Gifts({ searchParams }: GiftsProps) {
  const gifts = await getGifts({ searchParams });
  const currentUser = await getCurrentUser();
  const wedding = await getWeddingByUserId(currentUser?.id);
  const wishList = await getWishListByWeddingId(wedding?.wishListId);

  if (gifts?.length === 0) return <EmptyState showReset />;

  return (
    <>
      {gifts?.map(gift => (
        <GiftCard
          key={gift.id}
          gift={gift}
          wishListId={wishList?.id}
          currentUser={currentUser}
        />
      ))}
    </>
  );
}

export default Gifts;

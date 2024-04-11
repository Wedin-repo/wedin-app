import { getGiftLists } from '@/actions/giftLists/getGiftLists';
import EmptyState from '@/components/EmptyState';
import PredefinedGiftListCard from '@/components/cards/gifts/PredefinedGiftListCard';

async function GiftLists() {
  const giftLists = await getGiftLists();

  if (giftLists?.length === 0) return <EmptyState showReset />;

  return (
    <>
      {giftLists?.map(giftList => (
        <PredefinedGiftListCard key={giftList.id} giftList={giftList} />
      ))}
    </>
  );
}

export default GiftLists;

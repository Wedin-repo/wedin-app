import { GetGiftListsParams, getGiftLists } from '@/actions/getGiftLists';
import EmptyState from '@/components/EmptyState';
import GiftListCard from './card';
import { getGifts } from '@/actions/getGifts';

type GiftListsProps = {
  searchParams: GetGiftListsParams;
};

async function GiftLists({searchParams}: GiftListsProps) {
  const giftLists = await getGiftLists({searchParams});

  if (giftLists?.length === 0 || !giftLists) return <EmptyState title='No se encontraron listas pré-definidas' />;

  const giftListsData = await Promise.all(
    giftLists.map(async (giftList) => {
      const gifts = await getGifts({ searchParams: { giftListId: giftList.id } });
      return { ...giftList, gifts }; // Combine the gift list and gifts into a single object
    })
  );

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8'>
      {giftListsData?.map(giftListData => (
        <GiftListCard key={giftListData.id} giftList={giftListData} gifts={giftListData.gifts || []} />
      ))}
    </div>
  );
}

export default GiftLists;

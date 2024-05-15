import type { GetGiftListsSerachParams } from '../../page';
import { getGiftLists } from '@/actions/data/giftlist';
import EmptyState from '@/components/EmptyState';
import GiftListCard from '@/components/cards/gift-lists/card';
import CardContainer from '@/components/cards/shared/card-container';

type DefaultGiftListsProps = {
  searchParams: GetGiftListsSerachParams;
};

async function DefaultGiftLists({ searchParams }: DefaultGiftListsProps) {
  const giftLists = await getGiftLists({ searchParams });

  if (giftLists?.length === 0 || !giftLists)
    return <EmptyState title="No se encontraron listas pré-definidas" />;

  return (
    <CardContainer>
      {giftLists.map(giftList => (
        <GiftListCard key={giftList.id} giftList={giftList} />
      ))}
    </CardContainer>
  );
}
export default DefaultGiftLists;

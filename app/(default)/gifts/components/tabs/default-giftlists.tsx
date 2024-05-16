import { getGiftLists } from '@/actions/data/giftlist';
import type { GiftPageSearchParams } from '@/app/(default)/gifts/page';
import GiftListCard from '@/components/cards/giftlists';
import CardContainer from '@/components/cards/shared/card-container';
import EmptyState from '@/components/empty-state';

type DefaultGiftListsProps = {
  searchParams: GiftPageSearchParams;
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

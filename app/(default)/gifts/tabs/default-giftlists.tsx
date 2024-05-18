import { getGiftlists } from '@/actions/data/giftlist';
import type { GiftPageSearchParams } from '@/app/(default)/gifts/page';
import GiftlistCard from '@/components/cards/giftlists';
import CardContainer from '@/components/cards/shared/card-container';
import EmptyState from '@/components/empty-state';

type DefaultGiftlistsProps = {
  searchParams: GiftPageSearchParams;
};

async function DefaultGiftlists({ searchParams }: DefaultGiftlistsProps) {
  const giftlists = await getGiftlists({ searchParams });

  if (giftlists?.length === 0 || !giftlists)
    return <EmptyState title="No se encontraron listas pré-definidas" />;

  return (
    <CardContainer>
      {giftlists.map(giftlist => (
        <GiftlistCard key={giftlist.id} giftlist={giftlist} />
      ))}
    </CardContainer>
  );
}
export default DefaultGiftlists;

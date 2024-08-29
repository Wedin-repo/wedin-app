import { getCategories } from '@/actions/data/category';
import type {
  Event,
  Gift,
  Transaction,
  User,
  WishlistGift,
} from '@prisma/client';
import { Suspense } from 'react';
import Banner from '../../banner';
import Categories from '../../categories';
import Loader from '../../loader';
import InviteeGifts from './invitee-gifts';
import { EventPageSearchParams } from '@/app/(default)/events/[slug]/page';
import InviteeTop from './invitee-top';
import Logo from '@/components/logo';
import { Cart } from '@/components/cart/cart';
import { CartProvider } from '@/lib/context/cart-context';

type InvateePageProps = {
  event: Event & {
    wishlistGifts: (WishlistGift & {
      gift: Gift;
      transactions: Transaction[];
    })[];
    eventPrimaryUser: User | null;
    eventSecondaryUser: User | null;
  };
  searchParams: EventPageSearchParams;
};
async function InvateePage({ event, searchParams }: InvateePageProps) {
  const categories = await getCategories();
  const { eventPrimaryUser, eventSecondaryUser } = event;
  return (
    <CartProvider>
      <div className="flex flex-col items-start gap-10">
        <InviteeTop eventUrl={event.url} />
        <Logo />
        <Banner
          primaryUser={eventPrimaryUser}
          secondaryUser={eventSecondaryUser}
          eventDate={event.date}
          eventCoverMessage={event.coverMessage}
          eventCoverImageUrl={event.coverImageUrl}
        />
      </div>

      <div className="my-8">
        <Categories categories={categories} />
      </div>

      <div className="mb-14">
        <Suspense fallback={<Loader />}>
          <InviteeGifts event={event} searchParams={searchParams} />
        </Suspense>
      </div>
      <Cart />
    </CartProvider>
  );
}

export default InvateePage;

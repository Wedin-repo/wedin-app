import { getCategories } from '@/actions/data/category';
import type {
  Event,
  Gift,
  Transaction,
  User,
  WishlistGift,
} from '@prisma/client';
import { Suspense } from 'react';
import Banner from '../banner';
import Categories from '../categories';
import Loader from '../loader';
import InviteeGifts from './invitee-gifts';

type InvateePageProps = {
  event: Event & {
    wishlistGifts: (WishlistGift & {
      gift: Gift;
      transactions: Transaction[];
    })[];
    eventPrimaryUser: User | null;
    eventSecondaryUser: User | null;
  };
};
async function InvateePage({ event }: InvateePageProps) {
  const categories = await getCategories();
  const { eventPrimaryUser, eventSecondaryUser } = event;
  return (
    <>
      <h2 className="flex justify-start items-start my-8 w-full text-3xl font-medium sm:text-5xl text-primaryTextColor">
        Lista de bodas {event.eventPrimaryUser?.name} &{' '}
        {event.eventSecondaryUser?.name}
      </h2>

      <Banner
        primayUser={eventPrimaryUser}
        secondaryUser={eventSecondaryUser}
        eventDate={event.date}
      />

      <div className="my-16">
        <Categories categories={categories} />
      </div>

      <div>
        <Suspense fallback={<Loader />}>
          <InviteeGifts event={event} />
        </Suspense>
      </div>
    </>
  );
}

export default InvateePage;

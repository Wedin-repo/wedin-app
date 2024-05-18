import { getCategories } from '@/actions/data/category';
import type { EventPageSearchParams } from '@/app/(default)/events/[slug]/page';
import Categories from '@/app/(default)/gifts/components/categories';
import type { Event, User, WishListGift } from '@prisma/client';
import { Suspense } from 'react';
import Banner from '../banner';
import Loader from '../loader';
import InviteeGifts from './invitee-gifts';

type InvateePageProps = {
  event: Event & {
    wishlistGifts: WishListGift[];
    eventPrimaryUser: User | null;
    eventSecondaryUser: User | null;
  };
  searchParams: EventPageSearchParams;
};

async function InvateePage({ event, searchParams }: InvateePageProps) {
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
          <InviteeGifts event={event} searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

export default InvateePage;

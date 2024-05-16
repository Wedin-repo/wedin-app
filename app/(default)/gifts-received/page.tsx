import GiftsReceivedHeader from './components/gifts-received-header';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
//import SearchBar from '@/components/search-bar';
import GiftsReceived from '@/components/cards/gifts-received';

export type GiftsReceivedPageSearchParams = {
  name?: string;
  page?: string;
};

type GiftsReceivedPageProps = {
  searchParams: GiftsReceivedPageSearchParams;
};

const GiftsReceivedPage = ({ searchParams }: GiftsReceivedPageProps) => {
  return (
    <div className="flex flex-col justify-start mt-12 h-full">
      <GiftsReceivedHeader />

      {/* <SearchBar scrollValue={200} scrollValueMobile={250} /> */}

      <Suspense fallback={<Loader />}>
        <GiftsReceived searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default GiftsReceivedPage;

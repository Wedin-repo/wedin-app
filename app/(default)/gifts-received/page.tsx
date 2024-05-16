import Loader from '@/components/Loader';
import { Suspense } from 'react';
import GiftsReceivedHeader from './components/gifts-received-header';
import GiftsReceived from './components/gifts-received';
//import SearchBar from '@/components/search-bar';

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

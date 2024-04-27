import { Suspense } from 'react';
import { GetGiftsParams } from '@/actions/getGifts';
import Gifts from '@/components/cards/dashboard';
import SearchBar from '../../components/search-bar';
import { Loader2 } from 'lucide-react';

type AllGiftsProps = {
  searchParams: GetGiftsParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  return (
    <>
      <div className="my-8">
        <SearchBar />
      </div>

      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <Loader2 className="h-20 w-20 animate-spin text-secondaryBorderColor" />
          </div>
        }
      >
        <Gifts searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default AllGifts;

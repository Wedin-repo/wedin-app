import type { GetGiftsParams } from '@/actions/data/gift';
import Loader from '@/components/Loader';
import DashboardGifts from '@/components/cards/dashboard';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';
import DashboardHeader from './components/dashboard-header';

export type DashboardPageSearchParams = Pick<GetGiftsParams, 'name' | 'page'>;

type DashboardPageProps = {
  searchParams: DashboardPageSearchParams;
};

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="flex flex-col justify-start mt-12 h-full">
      <DashboardHeader />

      <SearchBar scrollValue={200} scrollValueMobile={250} />

      <Suspense fallback={<Loader />}>
        <DashboardGifts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

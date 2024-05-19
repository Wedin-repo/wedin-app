import SearchBar from '@/components/search-bar';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';
import AdminHeader from './admin-header';
import Transactions from './transactions';

export type AdminPageSearchParams = {
  name?: string;
  page?: string;
  userId?: string;
  eventId?: string;
};

type AdminPageProps = {
  searchParams: AdminPageSearchParams;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  return (
    <div className="flex flex-col justify-start mt-12 h-full">
      <AdminHeader searchParams={searchParams} />

      <SearchBar scrollValue={200} scrollValueMobile={250} />

      <Suspense fallback={<Loader />}>
        <Transactions searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

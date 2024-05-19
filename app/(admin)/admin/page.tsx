import WislistGifts from '@/app/(default)/dashboard/components/wislists-gifts';
import SearchBar from '@/components/search-bar';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';
import AdminHeader from './admin-header';

export type AdminPageSearchParams = {
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
        <WislistGifts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

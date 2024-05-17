import { getCategories } from '@/actions/data/category';
import Loader from '@/components/loader';
import SearchBar from '@/components/search-bar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Suspense } from 'react';
import { IoAdd, IoGiftOutline } from 'react-icons/io5';
import { PiCouchLight } from 'react-icons/pi';
import Categories from './components/categories';
import CreateGift from './components/tabs/create-gift';
import DefaultGiftLists from './components/tabs/default-giftlists';
import DefaultGifts from './components/tabs/default-gifts';

const TABS = {
  predefinedGifts: 'predefinedGifts',
  allGifts: 'allGifts',
  createGift: 'createGift',
};

const DEFAULT_TAB = TABS.predefinedGifts;

export type GiftPageSearchParams = {
  tab?: string;
  category?: string; // -> Gift and Giftlist params
  name?: string; // -> Gift and Giftlist params
  page?: string; // -> Gift
};

type GiftsPageProps = {
  searchParams: GiftPageSearchParams;
};

const GiftsPage = async ({ searchParams }: GiftsPageProps) => {
  const categories = await getCategories();
  const { tab = '' } = searchParams;
  const currentTab = TABS[tab as keyof typeof TABS] || DEFAULT_TAB;

  return (
    <div className="flex flex-col justify-start no-scrollbar">
      <h1 className="flex justify-center items-center my-8 w-full text-4xl font-medium sm:text-5xl text-primaryTextColor">
        Agregar regalos
      </h1>
      <Tabs defaultValue={DEFAULT_TAB} value={currentTab}>
        <TabsList className="flex items-center justify-start gap-4 my-4 sm:my-8 border-b border-[#D7D7D7] overflow-x-auto overflow-y-hidden no-scrollbar">
          <TabsTrigger value={TABS.predefinedGifts} asChild>
            <Link
              href={{
                query: { ...searchParams, tab: TABS.predefinedGifts },
              }}
              className="flex gap-2 items-center"
            >
              <IoGiftOutline size={24} className="mb-[2.5px]" />
              <span>Listas pré-definidas</span>
            </Link>
          </TabsTrigger>

          <TabsTrigger value={TABS.allGifts} asChild>
            <Link
              href={{
                query: { ...searchParams, tab: TABS.allGifts },
              }}
              className="flex gap-2 items-center"
            >
              <PiCouchLight size={24} />
              <span>Todos los productos</span>
            </Link>
          </TabsTrigger>

          <TabsTrigger value={TABS.createGift} asChild>
            <Link
              href={{
                query: { tab: TABS.createGift },
              }}
              className="flex gap-2 items-center"
            >
              <IoAdd size={24} />
              <span>Crear regalo</span>
            </Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TABS.predefinedGifts}>
          <SearchBar />

          <p className="mb-4 text-lg sm:mb-6 sm:text-xl text-secondaryTextColor">
            Comenzá con una lista pre-definida, podes personalizarla más
            adelante
          </p>

          <Categories categories={categories} />

          <Suspense fallback={<Loader />}>
            <DefaultGiftLists searchParams={searchParams} />
          </Suspense>
        </TabsContent>

        <TabsContent value={TABS.allGifts}>
          <SearchBar />

          <p className="mb-4 text-lg sm:mb-6 sm:text-xl text-secondaryTextColor">
            Elegí los productos que más te gusten y empezá a armar tu lista
          </p>

          <Categories categories={categories} />

          <Suspense fallback={<Loader />}>
            <DefaultGifts searchParams={searchParams} />
          </Suspense>
        </TabsContent>

        <TabsContent value={TABS.createGift}>
          <Suspense fallback={<Loader />}>
            <CreateGift />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GiftsPage;

import { GetGiftListsParams } from '@/actions/data/giftlist';
import { GetGiftsParams } from '@/actions/getGifts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { IoAdd, IoGiftOutline } from 'react-icons/io5';
import { PiCouchLight } from 'react-icons/pi';
import GiftHeader from './components/gifts-header';
import AllGifts from './components/tabs/all-gifts';
import PredefinedGifts from './components/tabs/predefined-gifts';

const TABS = {
  predefinedGifts: 'predefinedGifts',
  allGifts: 'allGifts',
  createGift: 'createGift',
};

const DEFAULT_TAB = TABS.predefinedGifts;

type GetGiftSearchParams = {
  tab?: string;
} & GetGiftsParams &
  GetGiftListsParams;

type GiftsPageProps = {
  searchParams: GetGiftSearchParams;
};

const GiftsPage = async ({ searchParams }: GiftsPageProps) => {
  const { tab = '' } = searchParams;
  const currentTab = TABS[tab as keyof typeof TABS] || DEFAULT_TAB;

  return (
    <div className="min-h-[90vh] flex flex-col justify-start">
      <GiftHeader />

      <Tabs defaultValue={DEFAULT_TAB} value={currentTab}>
        <TabsList className="flex items-center justify-start gap-4 my-4 sm:my-8 border-b border-[#D7D7D7] px-4 sm:px-10 overflow-x-auto overflow-y-hidden">
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
                query: { tab: 'create-gift' },
              }}
              className="flex gap-2 items-center"
            >
              <IoAdd size={24} />
              <span>Crear regalo</span>
            </Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TABS.predefinedGifts}>
          <PredefinedGifts searchParams={searchParams} />
        </TabsContent>

        <TabsContent value={TABS.allGifts}>
          <AllGifts searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GiftsPage;

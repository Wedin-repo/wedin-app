import { GetGiftParams } from '@/actions/getGift';
import { GetGiftListsParams } from '@/actions/getGiftLists';
import Container from '@/components/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { IoAdd, IoGiftOutline } from 'react-icons/io5';
import { PiCouchLight } from 'react-icons/pi';
import GiftHeader from './gifts-header';
import AllGifts from './tabs/all-gifts';
import PredefinedGifts from './tabs/predefined-gifts';

const TABS = {
  predefinedGifts: 'predefinedGifts',
  allGifts: 'allGifts',
  createGift: 'createGift',
};

const DEFAULT_TAB = TABS.predefinedGifts;

type GetGiftSearchParams = {
  tab?: string;
} & GetGiftParams &
  GetGiftListsParams;

type GiftsPageProps = {
  searchParams: GetGiftSearchParams;
};

const GiftsPage = async ({ searchParams }: GiftsPageProps) => {
  const { tab = '' } = searchParams;
  const currentTab = TABS[tab as keyof typeof TABS] || DEFAULT_TAB;

  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start">
        <GiftHeader />

        <Tabs defaultValue="predefined-gift" value={currentTab} className="">
          <TabsList className="flex items-center justify-start gap-4 my-4 sm:my-8 border-b border-[#D7D7D7] px-4 sm:px-10 overflow-x-auto overflow-y-hidden">
            <TabsTrigger value={TABS.predefinedGifts} asChild>
              <Link
                href={{
                  query: { ...searchParams, tab: 'predefined-gift' },
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
                  query: { ...searchParams, tab: 'all-gifts' },
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
    </Container>
  );
};

export default GiftsPage;

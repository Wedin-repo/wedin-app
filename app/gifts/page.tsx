import { GetGiftParams } from '@/actions/getGift';
import Container from '@/components/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoAdd, IoGiftOutline } from 'react-icons/io5';
import { PiCouchLight } from 'react-icons/pi';
import GiftHeader from './gifts-header';
import AllGifts from './tabs/all-gifts';
import PredefinedGifts from './tabs/predefined-gifts';
import { GetGiftListsParams } from '@/actions/getGiftLists';
import Link from 'next/link';

type GiftsPageProps = {
  searchParams: GetGiftParams | GetGiftListsParams;
  tabParams?: string;
};

const GiftsPage = ({ searchParams }: GiftsPageProps) => {
  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start">
        <GiftHeader />

        <Tabs defaultValue={'predefined-gift'} value={searchParams?.tab}>
          <TabsList className="flex items-center justify-start gap-4 my-4 sm:my-8 border-b border-[#D7D7D7] px-4 sm:px-10 overflow-x-auto overflow-y-hidden">
            <TabsTrigger value="predefined-gift" asChild>
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

            <TabsTrigger value="all-gifts" asChild>
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

            <TabsTrigger value="create-gift" asChild>
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

          <TabsContent value="predefined-gift">
            <PredefinedGifts searchParams={searchParams} />
          </TabsContent>

          <TabsContent value="all-gifts">
            <AllGifts searchParams={searchParams} />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default GiftsPage;

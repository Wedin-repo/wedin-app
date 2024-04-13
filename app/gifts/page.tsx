import { GetGiftParams } from '@/actions/getGift';
import Container from '@/components/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoAdd, IoGiftOutline } from 'react-icons/io5';
import { PiCouchLight } from 'react-icons/pi';
import GiftHeader from './gifts-header';
import AllGifts from './tabs/all-gifts';
import PredefinedGifts from './tabs/predefined-gifts';

type GiftsPageProps = {
  searchParams: GetGiftParams;
};

const GiftsPage = async ({ searchParams }: GiftsPageProps) => {
  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start">
        <GiftHeader />

        <Tabs defaultValue="predefined-gift" className="">
          <TabsList className="flex items-center justify-start gap-4 my-6 sm:my-10 border-b border-[#D7D7D7] px-10 overflow-x-auto overflow-y-hidden">
            <TabsTrigger
              value="predefined-gift"
              className="flex gap-2 items-center"
            >
              <IoGiftOutline size={24} className="mb-[2.5px]" />
              <span>Listas pré-definidas</span>
            </TabsTrigger>

            <TabsTrigger value="all-gifts" className="flex gap-2 items-end">
              <PiCouchLight size={24} className="mb-[2.5px]" />
              <span>Todos los productos</span>
            </TabsTrigger>

            <TabsTrigger value="createGift" className="flex gap-2 items-center">
              <IoAdd size={24} />
              <span>Crear regalo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predefined-gift">
            <PredefinedGifts />
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

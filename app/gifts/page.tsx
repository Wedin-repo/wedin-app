import { getCategories } from '@/actions/gift/getCategory';
import { GiftParams } from '@/actions/gift/getGift';
import Container from '@/components/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoAdd, IoGiftOutline } from 'react-icons/io5';
import { PiCouchLight } from 'react-icons/pi';
import Categories from './categories';
import GiftLists from './gift-lists';
import Gifts from './gifts';
import { Suspense } from 'react';

const GiftsPage = async ({ searchParams }: { searchParams: GiftParams }) => {
  const categories = await getCategories();

  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start">
        <h1 className="text-4xl sm:text-5xl font-medium text-primaryTextColor px-10 mt-12 sm:mt-16">
          Créa tu lista de regalos
        </h1>

        <Tabs defaultValue="predefinedGift" className="">
          <TabsList className="flex items-center justify-start gap-4 my-6 sm:my-10 border-b border-[#D7D7D7] px-10 overflow-x-auto overflow-y-hidden">
            <TabsTrigger
              value="predefinedGift"
              className="flex gap-2 items-center"
            >
              <IoGiftOutline size={24} className="mb-[2.5px]" />
              <span>Listas pré-definidas</span>
            </TabsTrigger>

            <TabsTrigger value="allGifts" className="flex gap-2 items-end">
              <PiCouchLight size={24} className="mb-[2.5px]" />
              <span>Todos los productos</span>
            </TabsTrigger>

            <TabsTrigger value="createGift" className="flex gap-2 items-center">
              <IoAdd size={24} />
              <span>Crear regalo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predefinedGift">
            <p className="text-secondaryTextColor text-lg sm:text-xl mb-6 sm:mb-10 px-10">
              Comenzá con una lista pre-definida, podes personalizarla más
              adelante
            </p>

            <div className="flex justify-center items-center">
              <div className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8">
                <Suspense fallback={<div>Loading...</div>}>
                  <GiftLists />
                </Suspense>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="allGifts">
            <p className="text-secondaryTextColor text-lg sm:text-xl mb-6 sm:mb-8 px-10">
              Elegí los productos que más te gusten y empezá a armar tu lista
            </p>

            <Categories categories={categories} />

            <div className="flex justify-center items-center">
              <div className="px-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8">
                <Suspense fallback={<div>Loading...</div>}>
                  <Gifts searchParams={searchParams} />
                </Suspense>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default GiftsPage;

import { Suspense } from 'react';
import GiftLists from '../components/gift-lists';

function PredefinedGifts() {
  return (
    <div>
      <p className="text-secondaryTextColor text-lg sm:text-xl mb-6 sm:mb-10 px-10">
        Comenzá con una lista pre-definida, podes personalizarla más adelante
      </p>

      <div className="flex justify-center items-center">
        <div className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8">
          <Suspense fallback={<div>Loading...</div>}>
            <GiftLists />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default PredefinedGifts;

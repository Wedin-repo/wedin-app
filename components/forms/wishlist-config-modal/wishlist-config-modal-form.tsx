import WishlistConfigModalLeft from './wishlist-config-modal-left';
import EventDetailsForm from './event-details-form';
import WishlistUrlForm from './wishlist-url-form';
import { getEvent } from '@/actions/data/event';
import { Suspense } from 'react';
import WishlistConfigModalRight from './wishlist-config-modal-right';
import Loader from '@/components/loader';

const WishlistConfigModalForm = () => {
  // const event = await getEvent();

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="font-medium text-[#1E293B] text-3xl">
          Configurar mi lista
        </h1>
        <div className="w-full border rounded-full border-borderColor mt-4"></div>
      </div>

      <div className="flex justify-between pt-4 gap-6">
        <div className="w-1/2 flex flex-col justify-center">
          <WishlistConfigModalLeft />
        </div>

        <div className="w-1/2">
          <Suspense fallback={<Loader />}>
            <WishlistConfigModalRight
              content={'Datos bancarios y de facturación'}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default WishlistConfigModalForm;

import { FaChevronRight } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import EventDetailsForm from './event-details-form';

const WishlistConfigModalForm = () => {
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="font-medium text-[#1E293B] text-3xl">
          Configurar mi lista
        </h1>
        <div className="w-full border rounded-full border-borderColor mt-2"></div>
      </div>

      <div className="flex justify-between py-10">
        <div className="w-1/2">
          <div className="flex flex-col">
            <div className="flex justify-between items-center pr-6">
              <div className="flex gap-4 items-center">
                <div className="bg-[#F3F4F6] text-[#1E293B] p-4 rounded-lg">
                  <TbListDetails fontSize={'18px'} />
                </div>
                <p className="text-lg text-[#2E2E2E] font-semibold">
                  Tipo y datos del evento
                </p>
              </div>
              <div>
                <FaChevronRight fontSize={'18px'} />
              </div>
            </div>
            <div className="pr-6">
              <div className="w-full border rounded-full border-borderColor mt-4"></div>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <EventDetailsForm />
        </div>
      </div>
    </div>
  );
};

export default WishlistConfigModalForm;

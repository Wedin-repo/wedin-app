import { FaChevronRight, FaRegTrashAlt } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { FiCalendar } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { LuMessageSquare, LuImage } from 'react-icons/lu';
import { PiBank } from 'react-icons/pi';
import WishlistConfigModalLeft from './wishlist-config-modal-left';
import EventDetailsForm from './event-details-form';
import WishlistConfigCard from '@/components/cards/wishlist-config-card';

const WishlistConfigModalForm = () => {
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="font-medium text-[#1E293B] text-3xl">
          Configurar mi lista
        </h1>
        <div className="w-full border rounded-full border-borderColor mt-4"></div>
      </div>

      <div className="flex justify-between pt-6 gap-6">
        <div className="w-1/2 flex flex-col justify-center">
          <WishlistConfigModalLeft />
        </div>

        <div className="w-1/2">
          <EventDetailsForm />
        </div>
      </div>
    </div>
  );
};

export default WishlistConfigModalForm;

import WishlistConfigCard from '@/components/cards/wishlist-config-card';
import { FaChevronRight, FaRegTrashAlt } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { FiCalendar } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { LuMessageSquare, LuImage } from 'react-icons/lu';
import { PiBank } from 'react-icons/pi';

const WishlistConfigModalLeft = () => {
  return (
    <>
      <WishlistConfigCard
        icon={<TbListDetails fontSize={'18px'} />}
        title="Tipo y datos del evento"
        isSelected
      />
      <WishlistConfigCard
        icon={<IoIosLink fontSize={'18px'} />}
        title="Link de la lista"
      />
      <WishlistConfigCard
        icon={<LuImage fontSize={'18px'} />}
        title="Imagen de la portada"
      />
      <WishlistConfigCard
        icon={<LuMessageSquare fontSize={'18px'} />}
        title="Mensaje de la portada"
      />
      <WishlistConfigCard
        icon={<FiCalendar fontSize={'18px'} />}
        title="Fecha del evento"
      />
      <WishlistConfigCard
        icon={<PiBank fontSize={'18px'} />}
        title="Datos bancarios y de facturación"
      />
      <WishlistConfigCard
        icon={<FaRegTrashAlt fontSize={'18px'} />}
        title="Eliminar mi lista"
        isDeleteButton
      />
    </>
  );
};

export default WishlistConfigModalLeft;

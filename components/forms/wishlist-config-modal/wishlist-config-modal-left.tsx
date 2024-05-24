import React, { useState } from 'react';
import WishlistConfigCard from '@/components/cards/wishlist-config-card';
import { FaRegTrashAlt } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { FiCalendar } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { LuMessageSquare, LuImage } from 'react-icons/lu';
import { PiBank } from 'react-icons/pi';

const WishlistConfigModalLeft = () => {
  const [activeCard, setActiveCard] = useState<string>(
    'Tipo y datos del evento'
  );

  const handleCardClick = (title: string) => {
    setActiveCard(title);
  };

  return (
    <>
      <WishlistConfigCard
        icon={<TbListDetails fontSize={'18px'} />}
        title="Tipo y datos del evento"
        isActive={activeCard === 'Tipo y datos del evento'}
        onClick={() => handleCardClick('Tipo y datos del evento')}
      />
      <WishlistConfigCard
        icon={<IoIosLink fontSize={'18px'} />}
        title="Link de la lista"
        isActive={activeCard === 'Link de la lista'}
        onClick={() => handleCardClick('Link de la lista')}
      />
      <WishlistConfigCard
        icon={<LuImage fontSize={'18px'} />}
        title="Imagen de la portada"
        isActive={activeCard === 'Imagen de la portada'}
        onClick={() => handleCardClick('Imagen de la portada')}
      />
      <WishlistConfigCard
        icon={<LuMessageSquare fontSize={'18px'} />}
        title="Mensaje de la portada"
        isActive={activeCard === 'Mensaje de la portada'}
        onClick={() => handleCardClick('Mensaje de la portada')}
      />
      <WishlistConfigCard
        icon={<FiCalendar fontSize={'18px'} />}
        title="Fecha del evento"
        isActive={activeCard === 'Fecha del evento'}
        onClick={() => handleCardClick('Fecha del evento')}
      />
      <WishlistConfigCard
        icon={<PiBank fontSize={'18px'} />}
        title="Datos bancarios y de facturación"
        isActive={activeCard === 'Datos bancarios y de facturación'}
        onClick={() => handleCardClick('Datos bancarios y de facturación')}
      />
      <WishlistConfigCard
        icon={<FaRegTrashAlt fontSize={'18px'} />}
        title="Eliminar mi lista"
        isDeleteButton
        isActive={activeCard === 'Eliminar mi lista'}
        onClick={() => handleCardClick('Eliminar mi lista')}
      />
    </>
  );
};

export default WishlistConfigModalLeft;

import React, { useState } from 'react';
import WishlistConfigCard from '@/components/cards/wishlist-config-card';
import { FaRegTrashAlt } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { FiCalendar } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { LuMessageSquare, LuImage } from 'react-icons/lu';
import { PiBank } from 'react-icons/pi';

const options = [
  {
    id: '1',
    label: 'Tipo y datos del evento',
    icon: <TbListDetails fontSize={'18px'} />,
  },
  {
    id: '2',
    label: 'Link de la lista',
    icon: <IoIosLink fontSize={'18px'} />,
  },
  {
    id: '3',
    label: 'Imagen de la portada',
    icon: <LuImage fontSize={'18px'} />,
  },
  {
    id: '4',
    label: 'Mensaje de la portada',
    icon: <LuMessageSquare fontSize={'18px'} />,
  },
  {
    id: '5',
    label: 'Fecha del evento',
    icon: <FiCalendar fontSize={'18px'} />,
  },
  {
    id: '6',
    label: 'Datos bancarios y de facturación',
    icon: <PiBank fontSize={'18px'} />,
  },
  {
    id: '7',
    label: 'Eliminar mi lista',
    icon: <FaRegTrashAlt fontSize={'18px'} />,
    isDeleteButton: true,
  },
];

const WishlistConfigModalLeft = () => {
  const [activeCard, setActiveCard] = useState<string>(
    'Tipo y datos del evento'
  );

  const handleCardClick = (title: string) => {
    setActiveCard(title);
  };

  return (
    <>
      {options.map(option => (
        <WishlistConfigCard
          key={option.id}
          icon={option.icon}
          title={option.label}
          isActive={activeCard === option.label}
          isDeleteButton={option.isDeleteButton}
          onClick={() => handleCardClick(option.label)}
        />
      ))}
    </>
  );
};

export default WishlistConfigModalLeft;

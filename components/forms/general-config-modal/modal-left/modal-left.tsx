import React, { useState } from 'react';
import GeneralConfigCard from '@/components/cards/general-config-card';
//import { FaRegTrashAlt } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { FiCalendar } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { LuMessageSquare, LuImage } from 'react-icons/lu';
import { IoGiftOutline } from 'react-icons/io5';
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
    label: 'Sugerencia monto de regalo',
    icon: <IoGiftOutline fontSize={'18px'} />,
  },
  {
    id: '7',
    label: 'Datos bancarios y de facturación',
    icon: <PiBank fontSize={'18px'} />,
    isLastItem: true,
  },
  /* {
    id: '8',
    label: 'Eliminar mi lista',
    icon: <FaRegTrashAlt fontSize={'18px'} />,
    isDeleteButton: true,
  }, */
];

type ModalLeftProps = {
  onCardClick: (id: string) => void;
};

const ModalLeft = ({ onCardClick }: ModalLeftProps) => {
  const [activeCardId, setActiveCardId] = useState<string>('1');

  const handleCardClick = (id: string) => {
    setActiveCardId(id);
    onCardClick(id);
  };

  return (
    <>
      {options.map(option => (
        <GeneralConfigCard
          key={option.id}
          icon={option.icon}
          title={option.label}
          isActive={activeCardId === option.id}
          //isDeleteButton={option.isDeleteButton}
          isLastItem={option.isLastItem}
          onClick={() => handleCardClick(option.id)}
        />
      ))}
    </>
  );
};

export default ModalLeft;

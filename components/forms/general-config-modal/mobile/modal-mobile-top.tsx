import React, { useState } from 'react';
import GeneralConfigCard from '@/components/cards/general-config-card';
import { TbListDetails } from 'react-icons/tb';
import { FiCalendar } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { LuMessageSquare, LuImage } from 'react-icons/lu';
import { IoGiftOutline } from 'react-icons/io5';
import { PiBank } from 'react-icons/pi';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const options = [
  {
    id: '1',
    label: 'Tipo y datos del evento',
    icon: <TbListDetails fontSize={'20px'} />,
  },
  {
    id: '2',
    label: 'Link de la lista',
    icon: <IoIosLink fontSize={'20px'} />,
  },
  {
    id: '3',
    label: 'Imagen de la portada',
    icon: <LuImage fontSize={'20px'} />,
  },
  {
    id: '4',
    label: 'Mensaje de la portada',
    icon: <LuMessageSquare fontSize={'20px'} />,
  },
  {
    id: '5',
    label: 'Fecha del evento',
    icon: <FiCalendar fontSize={'20px'} />,
  },
  {
    id: '6',
    label: 'Sugerencia monto de regalo',
    icon: <IoGiftOutline fontSize={'20px'} />,
  },
  {
    id: '7',
    label: 'Datos bancarios y de facturación',
    icon: <PiBank fontSize={'20px'} />,
    isLastItem: true,
  },
  /* {
    id: '8',
    label: 'Eliminar mi lista',
    icon: <FaRegTrashAlt fontSize={'20px'} />,
    isDeleteButton: true,
  }, */
];

type ModalTopMobileProps = {
  onCardClick: (id: string) => void;
};

const ModalTopMobile = ({ onCardClick }: ModalTopMobileProps) => {
  const handleCardClick = (id: string) => {
    onCardClick(id);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium w-full justify-center flex text-xl">
        Configurar mi lista
      </h2>
      <Select defaultValue="1" onValueChange={value => handleCardClick(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una opción" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            {options.map(option => (
              <SelectItem key={option.id} value={option.id}>
                <div className="flex items-center gap-4 py-2 text-base">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModalTopMobile;

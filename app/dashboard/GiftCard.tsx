import { Gift } from '@prisma/client';
import { FiEdit3 } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';

type GiftCard = {
  gift: Gift;
};

const GiftCard = ({ gift }: GiftCard) => {
  const { name, description, price } = gift;
  return (
    <div className="border-b-[#848484] border-b pb-3 w-full flex items-center justify-between gap-4">
      <div>
        <div className="h-[90px] bg-borderColor rounded-xl w-[90px] flex items-center justify-center text-white">
          item
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full justify-start">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-sm text-secondaryTextColor">{description}</p>
        <span className="text-black text-xl">Gs. {price}</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="border border-[#484848] hover:bg-primaryBackgroundColor transition-colors hover:text-white rounded-xl p-2.5">
          <FiEdit3 />
        </button>
        <button className="border border-[#484848] hover:border-red-500 hover:bg-red-500 transition-colors hover:text-white rounded-xl p-2.5">
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default GiftCard;

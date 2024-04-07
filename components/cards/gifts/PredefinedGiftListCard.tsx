import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';
import { Button } from "@/components/ui/button"
import { GiftList } from '@prisma/client';

type GiftListCard = {
  giftList: GiftList;
};

const PredefinedGiftListCard = ({ giftList }: GiftListCard) => {
  const { name, description, totalPrice, quantity, id } = giftList;
  return (
    <div className="border-2 rounded-xl py-6 px-4 flex flex-col gap-5 max-w-[320px]">
      <div>
        <div className="h-[212px] w-full bg-borderColor rounded-xl flex items-start justify-end">
          <div className="bg-white rounded-full px-5 py-1.5 flex items-center justify-center mt-4 mr-4">
            {quantity} regalos
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>

        <p className="text-sm">{description}</p>
        <span className="text-black text-xl">Gs. {totalPrice}</span>
      </div>

      <Link href={`/lists/${id}`}>
        <Button variant='primaryButton'>
          Ver lista
          <GoArrowRight size={22} />
        </Button>
      </Link>
    </div>
  );
};

export default PredefinedGiftListCard;

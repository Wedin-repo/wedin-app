import { Gift } from '@prisma/client';

type GiftCard = {
  gift: Gift;
};

const GiftCard = ({ gift }: GiftCard) => {
  const { name, description, price } = gift;
  return (
    <div className="border-2 rounded-xl py-6 px-4 flex flex-col gap-4 max-w-[435px]">
      <div>
        <div className="h-[212px] w-full bg-borderColor rounded-xl flex items-start justify-end">
          {/* <div className="bg-white rounded-full px-5 py-1.5 flex items-center justify-center mt-4 mr-4">
            {quantity} regalos
          </div> */}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-sm">{description}</p>
      </div>

      <span className="text-black text-xl">Gs. {price}</span>
    </div>
  );
};

export default GiftCard;

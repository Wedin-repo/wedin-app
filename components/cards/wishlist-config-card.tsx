import { FaChevronRight, FaRegTrashAlt } from 'react-icons/fa';

type WishlistConfigCardProps = {
  icon: React.ReactNode;
  title: string;
  isSelected?: boolean;
  isCompleted?: boolean;
  isDeleteButton?: boolean;
};

const WishlistConfigCard = ({
  icon,
  title,
  isSelected,
  isCompleted,
  isDeleteButton,
}: WishlistConfigCardProps) => {
  if (isDeleteButton) {
    return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center cursor-pointer hover:opacity-70 transition-all">
          <div className="flex gap-4 items-center">
            <div className={`bg-[#F3F4F6] text-[#DC2626] p-4 rounded-lg`}>
              {icon}
            </div>
            <p className={`text-[#DC2626] font-normal`}>{title}</p>
          </div>
          <div className="text-[#DC2626]">
            <FaChevronRight fontSize={'18px'} />
          </div>
        </div>
        <div>
          <div className="w-full border rounded-full border-borderColor mt-2"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center cursor-pointer hover:opacity-70 transition-all">
        <div className="flex gap-4 items-center">
          <div className={`bg-[#F3F4F6] text-[#1E293B] p-4 rounded-lg`}>
            {icon}
          </div>
          <p
            className={
              isSelected
                ? `text-[#2E2E2E] font-semibold`
                : `text-[#2E2E2E] font-normal`
            }
          >
            {title}
          </p>
        </div>
        <div>
          <FaChevronRight fontSize={'18px'} />
        </div>
      </div>
      <div>
        <div className="w-full border rounded-full border-borderColor mt-2 mb-4"></div>
      </div>
    </div>
  );
};

export default WishlistConfigCard;

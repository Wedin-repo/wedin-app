import { FaChevronRight } from 'react-icons/fa';

type WishlistConfigCardProps = {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
  isDeleteButton?: boolean;
  onClick?: () => void;
};

const WishlistConfigCard = ({
  icon,
  title,
  isActive = false,
  isDeleteButton = false,
  isCompleted = false,
  onClick,
}: WishlistConfigCardProps) => {
  const baseTextColor = isDeleteButton ? 'text-[#DC2626]' : 'text-[#2E2E2E]';
  const baseBgColor = isDeleteButton ? 'bg-[#F3F4F6]' : 'bg-[#F3F4F6]';
  const textColor = isActive ? 'font-semibold' : 'font-normal';
  const isActiveHover = isActive
    ? 'cursor-not-allowed'
    : 'cursor-pointer hover:opacity-70 transition-all';
  const hideLastBorder = isDeleteButton ? 'mb-0' : 'mb-4';

  return (
    <div className="flex flex-col">
      <div
        className={`flex justify-between items-center ${isActiveHover}`}
        onClick={onClick}
      >
        <div className="flex gap-4 items-center">
          <div className={`${baseBgColor} ${baseTextColor} p-4 rounded-lg`}>
            {icon}
          </div>
          <p className={`${baseTextColor} ${textColor}`}>{title}</p>
        </div>
        <div className={baseTextColor}>
          <FaChevronRight fontSize={'18px'} />
        </div>
      </div>
      <div>
        <div
          className={`w-full border rounded-full border-borderColor mt-2 ${hideLastBorder}`}
        ></div>
      </div>
    </div>
  );
};

export default WishlistConfigCard;

import { FaChevronRight } from 'react-icons/fa';

type GeneralConfigCardProps = {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
  isDeleteButton?: boolean;
  isLastItem?: boolean;
  onClick?: () => void;
};

const GeneralConfigCard = ({
  icon,
  title,
  isActive = false,
  isDeleteButton = false,
  isCompleted = false,
  isLastItem = false,
  onClick,
}: GeneralConfigCardProps) => {
  const baseTextColor = isDeleteButton ? 'text-red-600' : 'text-gray-800';
  const baseBgColor = isDeleteButton ? 'bg-gray-100' : 'bg-gray-100';
  const textColor = isActive ? 'font-semibold' : 'font-normal';
  const isActiveHover = isActive
    ? 'cursor-not-allowed'
    : 'cursor-pointer hover:opacity-70 transition-all';
  const hideLastBorder = isLastItem ? 'mb-0' : 'mb-4';

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

export default GeneralConfigCard;

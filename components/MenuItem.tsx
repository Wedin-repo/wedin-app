import type { NextPage } from 'next';

type Props = {
  onClick: () => void;
  label: string;
  icon?: any;
};
const MenuItem: NextPage<Props> = ({ onClick, label, icon }) => {
  return (
    <div
      onClick={onClick}
      className="px-3 py-3 hover:bg-neutral-100 transition flex gap-2 items-center"
    >
      {icon}
      {label}
    </div>
  );
};

export default MenuItem;

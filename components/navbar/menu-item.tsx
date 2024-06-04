import logout from '@/actions/auth/logout';
import { Button } from '@/components/ui/button';
import type { ReactElement } from 'react';

type MenuItemProps = {
  variant?: 'logoutButton';
  onClick?: () => void;
  label: string;
  icon?: ReactElement;
};

const handleLogout = async () => {
  await logout();
};

const MenuItem = ({ onClick, label, icon, variant }: MenuItemProps) => {
  if (variant === 'logoutButton') {
    return (
      <form action={handleLogout} className="w-full">
        <Button
          type="submit"
          variant="logoutButton"
          className="flex gap-3 justify-start items-center px-2 w-full"
        >
          {icon}
          {label}
        </Button>
      </form>
    );
  }

  return (
    <Button
      onClick={onClick}
      className="flex gap-3 justify-start items-center px-2 w-full transition hover:bg-neutral-100"
    >
      {icon}
      {label}
    </Button>
  );
};

export default MenuItem;

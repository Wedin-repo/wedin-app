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
      <form action={handleLogout}>
        <Button type="submit" variant="logoutButton">
          {icon}
          {label}
        </Button>
      </form>
    );
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={onClick}
      className="flex gap-2 items-center py-3 px-3 transition hover:bg-neutral-100"
    >
      {icon}
      {label}
    </div>
  );
};

export default MenuItem;

import logout from '@/actions/auth/logout';
import { Button } from '@/components/ui/button';

type MenuItemProps = {
  variant?: 'logoutButton';
  onClick?: () => void;
  label: string;
  icon?: any;
};
const MenuItem = ({ onClick, label, icon, variant }: MenuItemProps) => {
  const handleLogout = async () => {
    await logout();
  };

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

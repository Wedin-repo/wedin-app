import logout from '@/actions/logout';
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
      className="px-3 py-3 hover:bg-neutral-100 transition flex gap-2 items-center"
    >
      {icon}
      {label}
    </div>
  );
};

export default MenuItem;

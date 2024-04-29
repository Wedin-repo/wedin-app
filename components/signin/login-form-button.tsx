import { Button } from '@/components/ui/button';
import { capitalizeFirstLetter } from '@/utils/format';
import { Loader2 } from 'lucide-react';

type LoginFormButtonProps = {
  variant?: string;
  label?: string;
  isLoading?: boolean;
  handleSignIn?: () => void;
};

export default function LoginFormButton({
  variant,
  label,
  isLoading, // we use this because the login is using on submit and not action
  handleSignIn, // we use this because the login is using on submit and not action
}: LoginFormButtonProps) {
  if (variant === 'socialMediaLoginButton') {
    return (
      <Button
        onClick={handleSignIn}
        variant="socialMediaLoginButton"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          `${capitalizeFirstLetter(label)}`
        )}
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      variant="primaryButton"
      className="rounded-lg"
      disabled={isLoading}
    >
      Iniciar sesión
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
    </Button>
  );
}

import { Button } from '@/components/ui/button';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type AuthFormButtonProps = {
  variant?: string;
  label?: string;
  isLoading?: boolean;
  handleSignIn?: () => void;
};

export default function AuthFormButton({
  variant,
  label = 'Iniciar sesión',
  isLoading, // we use this because the login is using on submit and not action
  handleSignIn, // we use this because the login is using on submit and not action
}: AuthFormButtonProps) {
  if (variant === 'socialMediaLoginButton') {
    return (
      <Button
        onClick={handleSignIn}
        variant="socialMediaLoginButton"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
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
      {label}
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
    </Button>
  );
}

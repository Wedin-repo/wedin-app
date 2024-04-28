import { Button } from '@/components/ui/button';
import { capitalizeFirstLetter } from '@/utils/format';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type LoginFormButtonProps = {
  variant?: string;
  label?: string;
  isLoading?: boolean;
};

export default function LoginFormButton({
  variant,
  label,
  isLoading, // we use this because the login is using on submit and not action
}: LoginFormButtonProps) {
  const { pending } = useFormStatus();

  if (variant === 'socialMediaLoginButton') {
    return (
      <Button type="submit" variant="socialMediaLoginButton" disabled={pending}>
        {pending ? (
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

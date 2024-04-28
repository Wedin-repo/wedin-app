import { Button } from '@/components/ui/button';
import { capitalizeFirstLetter } from '@/utils/format';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type LoginFormButtonProps = {
  variant?: string;
  label?: string;
};

export default function LoginFormButton({
  variant,
  label,
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
      disabled={pending}
    >
      Iniciar sesión
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
    </Button>
  );
}

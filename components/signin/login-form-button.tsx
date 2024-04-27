import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function LoginFormButton() {
  const { pending } = useFormStatus();

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

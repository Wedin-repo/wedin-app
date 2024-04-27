import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { IoAdd } from 'react-icons/io5';

function AddToWishListButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="primaryButton" disabled={pending}>
      Agregar a mi lista
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <IoAdd size={22} />
      )}
    </Button>
  );
}

export default AddToWishListButton;

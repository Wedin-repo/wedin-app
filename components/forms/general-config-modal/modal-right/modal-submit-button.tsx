import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { FormState } from 'react-hook-form';

type ModalSubmitButtonProps = {
  isLoading: boolean;
  formState: FormState<any>;
};

const ModalSubmitButton = ({
  isLoading,
  formState,
}: ModalSubmitButtonProps) => {
  return (
    <Button
      variant="editGiftButton"
      type="submit"
      disabled={isLoading || !formState.isDirty}
    >
      Guardar
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
    </Button>
  );
};

export default ModalSubmitButton;

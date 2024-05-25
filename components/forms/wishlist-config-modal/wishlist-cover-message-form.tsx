import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { WishlistCoverMessageFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

type WishlistCoverMessageFormProps = {
  event?: Event | null;
};

const WishlistCoverMessageForm = ({ event }: WishlistCoverMessageFormProps) => {
  const form = useForm({
    resolver: zodResolver(WishlistCoverMessageFormSchema),
    defaultValues: {
      coverMessage: '',
    },
  });

  const onSubmit = () => {
    console.log('hello world');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between"
      >
        <FormField
          control={form.control}
          name="coverMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">
                Tu mensaje de bienvenida a tu lista para tus invitados
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ej. Gracias por ser parte de nuestro gran día. 😄🎉"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="editGiftButton" type="submit" className="mt-5">
          Guardar
        </Button>
      </form>
    </Form>
  );
};

export default WishlistCoverMessageForm;

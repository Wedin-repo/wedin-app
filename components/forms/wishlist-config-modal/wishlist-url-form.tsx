import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { WishlistUrlFormSchema } from '@/schemas/form';
import { Event } from '@prisma/client';
import { Loader2 } from 'lucide-react';

type WishlistUrlFormProps = {
  event?: Event | null;
};

const WishlistUrlForm = ({ event }: WishlistUrlFormProps) => {
  const form = useForm({
    resolver: zodResolver(WishlistUrlFormSchema),
    defaultValues: {
      wishlistUrl: event?.url ?? '30crisley',
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
          name="wishlistUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col">
                  <p className="font-medium text-[#0F172A] mb-2 sm:text-start text-center">
                    ¿Qué dirección quieres para tu espacio? Escribe la dirección
                    para comprobar su disponibilidad
                  </p>
                  <div className="flex gap-3 items-center">
                    <div className="bg-[#9CA3AF] rounded-lg h-10 px-4 flex items-center justify-center text-white text-sm font-medium">
                      wedin.app/
                    </div>
                    <Input {...field} />
                  </div>
                  <p className="text-xs text-red-600 mt-2">
                    *El nombre no puede incluir caracteres especiales de
                    (.*%$#&...)
                  </p>
                </div>
              </FormControl>
              <FormMessage className="font-normal text-red-600" />
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

export default WishlistUrlForm;

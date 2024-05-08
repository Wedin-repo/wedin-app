import { stepOneUpdate } from '@/actions/auth/step-one-update';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { StepOneSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type StepOneProps = {
  onNextStep: () => void;
};

const StepOne = ({ onNextStep }: StepOneProps) => {
  const [isDecidingWeddingDate, setIsDecidingWeddingDate] = useState<
    boolean | string
  >(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof StepOneSchema>>({
    resolver: zodResolver(StepOneSchema),
    defaultValues: {
      weddingUrl: '',
      name: '',
      lastName: '',
      partnerName: '',
      partnerLastName: '',
      partnerEmail: '',
      weddingDate: undefined,
      isDecidingWeddingDate: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof StepOneSchema>) => {
    setIsLoading(true);
    const validatedFields = StepOneSchema.safeParse(values);
    if (validatedFields.success) {
      let response = await stepOneUpdate(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error al completar el paso 1',
          description: response.error,
        });

        setIsLoading(false);
        return null;
      }
    }

    setIsLoading(false);
    onNextStep();
  };

  const handleIsDecidingChange = (value: boolean | string) => {
    setIsDecidingWeddingDate(value);
    if (value) {
      form.setValue('weddingDate', undefined);
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:w-[682px]">
      <p className="text-2xl font-medium text-center sm:text-3xl text-primaryTextColor">
        Antes de empezar, necesitamos unos datos
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="weddingUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-[#0F172A] mb-2 sm:text-start text-center">
                      ¿Qué dirección quieres para tu espacio? Escribe la
                      dirección para comprobar su disponibilidad
                    </p>
                    <div className="flex gap-3 items-center">
                      <div className="bg-[#9CA3AF] rounded-lg h-10 px-4 flex items-center justify-center text-white text-sm font-medium">
                        wedin.app/
                      </div>
                      <Input placeholder="yayoycris" {...field} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="font-normal text-red-600" />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Santiago"
                        className="!mt-1.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Figueiredo"
                        className="!mt-1.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name="partnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>El nombre de tu pareja</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Crisley"
                        className="!mt-1.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="partnerLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>El apellido de tu pareja</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dominguez"
                        className="!mt-1.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="partnerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email de tu pareja</FormLabel>
                <FormControl>
                  <Input
                    placeholder="crisley@wedin.app"
                    className="!mt-1.5"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-normal text-red-600" />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col justify-start items-start w-full text-sm font-medium sm:flex-row">
              Fecha de la boda &nbsp;
              <span className="font-normal text-sm text-[#64748B]">
                (No te preocupes, puede cambiarlo mas adelante)
              </span>
            </div>

            <div className="flex gap-6 items-center w-full">
              {!isDecidingWeddingDate ? (
                <FormField
                  control={form.control}
                  name="weddingDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-1/2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-[#94A3B8]'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP', { locale: es })
                              ) : (
                                <span className="text-[#94A3B8]">dd/mm/aa</span>
                              )}
                              <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0 w-auto bg-white"
                          align="start"
                        >
                          <Calendar
                            locale={es}
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="font-normal text-red-600" />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="w-1/2">
                  <Button
                    disabled
                    variant={'outline'}
                    className={cn(
                      'w-full pl-3 text-left font-normal text-[#94A3B8]'
                    )}
                  >
                    <span className="text-[#94A3B8]">dd/mm/aa</span>
                    <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
                  </Button>
                </div>
              )}
              <FormField
                control={form.control}
                name="isDecidingWeddingDate"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={checked => {
                          field.onChange(checked);
                          handleIsDecidingChange(checked);
                        }}
                      />
                    </FormControl>
                    <div className="!m-0">
                      <FormLabel className="text-sm font-normal cursor-pointer sm:text-base">
                        Aún estamos decidiendo
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div style={{ margin: '0 auto', marginTop: '20px' }}>
            <Button
              type="submit"
              variant="onboardingButton"
              disabled={isLoading}
            >
              Registrarme
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepOne;

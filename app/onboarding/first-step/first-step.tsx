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
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { makeAndHandleApiCall } from '../helper';

const formSchema = z.object({
  weddingUrl: z
    .string()
    .min(1, { message: 'La dirección de tu espacio no puede estar vacío' })
    .min(3, {
      message: 'La dirección de tu espacio debe contener al menos 3 caracteres',
    })
    .max(255, {
      message:
        'La dirección de tu espacio debe contener un máximo de 255 caracteres',
    }),
  name: z
    .string()
    .min(1, { message: 'El nombre no puede estar vacío' })
    .min(2, { message: 'Nombre muy corto' })
    .max(255, { message: 'Nombre muy largo' }),
  lastName: z
    .string()
    .min(1, { message: 'El apellido no puede estar vacío' })
    .min(2, { message: 'Apellido muy corto' })
    .max(255, { message: 'Apellido muy largo' }),
  partnerName: z
    .string()
    .min(1, { message: 'El nombre de tu pareja no puede estar vacío' })
    .min(2, { message: 'Nombre muy corto' })
    .max(255, { message: 'Nombre muy largo' }),
  partnerLastName: z
    .string()
    .min(1, { message: 'El apellido de tu pareja no puede estar vacío' })
    .min(2, { message: 'Apellido muy corto' })
    .max(255, { message: 'Apellido muy largo' }),
  partnerEmail: z
    .string()
    .min(1, { message: 'El email de tu pareja no puede estar vacío' })
    .email('Email inválido'),
  weddingDate: z.date().optional(),
  isDecidingWeddingDate: z.boolean(),
});

type FirstStepProps = {
  onNextStep: () => void;
  currentUser: User;
};

const FirstStep: React.FC<FirstStepProps> = ({ onNextStep, currentUser }) => {
  const [isDecidingWeddingDate, setIsDecidingWeddingDate] = useState<
    boolean | string
  >(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const handleSubmit = async () => {
    setIsLoading(true);
    const formValues = form.getValues();
    const {
      name,
      lastName,
      weddingUrl,
      weddingDate,
      partnerEmail,
      partnerName,
      partnerLastName,
    } = formValues;
    const userId = currentUser?.id;

    try {
      await makeAndHandleApiCall(
        '/api/onboarding/updateUser',
        { userId, name, lastName, onboardingStep: 2 },
        'No se pudo actualizar la información del usuario.'
      );
      // change to createWedding and updateWedding
      await makeAndHandleApiCall(
        '/api/onboarding/createWeddingAndBride',
        {
          userId,
          weddingDate,
          weddingUrl,
          partnerEmail,
          partnerName,
          partnerLastName,
        },
        'No se pudo actualizar los detalles de la boda.'
      );

      onNextStep();
    } catch (error) {
      console.error('API call failed:', error);
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Uh Oh! Algo salió mal.',
          description: error.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh Oh! Algo salió mal.',
          description: 'An unexpected error occurred.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleIsDecidingChange = (value: boolean | string) => {
    setIsDecidingWeddingDate(value);
    if (value) {
      form.setValue('weddingDate', undefined);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <p className="text-2xl sm:text-3xl text-primaryTextColor text-center font-medium">
        Antes de empezar, necesitamos unos datos
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
                    <div className="flex items-center gap-3">
                      <div className="bg-[#9CA3AF] rounded-lg h-10 px-4 flex items-center justify-center text-white text-sm font-medium">
                        wedin.app/
                      </div>
                      <Input placeholder="yayoycris" {...field} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="font-normal text-yellow-600" />
              </FormItem>
            )}
          />

          <div className="flex gap-2 w-full">
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
                    <FormMessage className="font-normal text-yellow-600" />
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
                    <FormMessage className="font-normal text-yellow-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-2 w-full">
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
                    <FormMessage className="font-normal text-yellow-600" />
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
                    <FormMessage className="font-normal text-yellow-600" />
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
                <FormMessage className="font-normal text-yellow-600" />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center gap-2 w-full">
            <div className="font-medium text-sm flex flex-col sm:flex-row items-start justify-start w-full">
              Fecha de la boda &nbsp;
              <span className="font-normal text-sm text-[#64748B]">
                (No te preocupes, puede cambiarlo mas adelante)
              </span>
            </div>

            <div className="w-full flex items-center gap-6">
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
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-white"
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
                      <FormMessage className="font-normal text-yellow-600" />
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
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </div>
              )}
              <FormField
                control={form.control}
                name="isDecidingWeddingDate"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
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
                      <FormLabel className="font-normal text-sm sm:text-md cursor-pointer">
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
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FirstStep;

'use client';

import { Button } from '@/components/ui/button';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa6';
import { boolean, z } from 'zod';
import { countries } from '../countries';
import { makeAndHandleApiCall } from '../helper';

const formSchema = z.object({
  weddingCountry: z.string(),
  weddingCity: z.string(),
  isDecidingWeddingCountryCity: boolean(),
  hasPYbankAccount: z.boolean(),
});

type SecondStepProps = {
  currentUser: User;
};

const SecondStep: React.FC<SecondStepProps> = ({ currentUser }) => {
  const [isDecidingWeddingCountryCity, setIsDecidingWeddingCountryCity] =
    React.useState<boolean | string>(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weddingCountry: '',
      weddingCity: '',
      isDecidingWeddingCountryCity: false,
      hasPYbankAccount: true,
    },
  });

  const handleSubmitFinal = async () => {
    setIsLoading(true);
    const formValues = form.getValues();
    const { weddingCountry, weddingCity, hasPYbankAccount } = formValues;
    const userId = currentUser.id;

    try {
      // TODO: Change this to Update Wedding
      await makeAndHandleApiCall(
        '/api/onboarding/updateWeddingCountryCity',
        { userId, weddingCountry, weddingCity },
        'No se pudo actualizar los detalles de la boda.'
      );
      // TODO: Change this to Update user
      // api/onboarding/updateUser/route.ts
      await makeAndHandleApiCall(
        '/api/onboarding/updateUserBankAccount',
        { userId, hasPYbankAccount },
        'No se pudo actualizar la información del usuario.'
      );

      window.location.href = '/';
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

  const handleIsDecidingCountryCity = (value: boolean | string) => {
    setIsDecidingWeddingCountryCity(value);
    if (value) {
      form.setValue('weddingCountry', '');
      form.setValue('weddingCity', '');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <p className="text-2xl sm:text-3xl text-primaryTextColor text-center font-medium">
        Donde te casas?
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitFinal)}
          className="flex flex-col items-start w-full gap-6"
        >
          {!isDecidingWeddingCountryCity ? (
            <>
              <FormField
                control={form.control}
                name="weddingCountry"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>País</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="País donde te casas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white max-h-60">
                        {countries.map(country => (
                          <SelectItem
                            key={country.id}
                            value={country.name}
                            className="border-b-[1px] cursor-pointer"
                            style={{ margin: '0 auto' }}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-normal text-yellow-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weddingCity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="San Bernardino"
                        className="!mt-1.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-yellow-600" />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormItem className="w-full">
                <FormLabel>País</FormLabel>
                <Select disabled>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="País donde te casas" />
                    </SelectTrigger>
                  </FormControl>
                </Select>
              </FormItem>
              <FormItem className="w-full">
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="San Bernardino"
                    className="!mt-1.5"
                  />
                </FormControl>
              </FormItem>
            </>
          )}

          <FormField
            control={form.control}
            name="isDecidingWeddingCountryCity"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={checked => {
                      field.onChange(checked);
                      handleIsDecidingCountryCity(checked);
                    }}
                  />
                </FormControl>
                <div className="!m-0">
                  <FormLabel className="font-normal text-md cursor-pointer">
                    Aún estamos decidiendo
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <p className="max-w-sm">
              Tenés cuenta bancária en Paraguay para recibir el valor de los
              regalos?
            </p>
            <FormField
              control={form.control}
              name="hasPYbankAccount"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={value => field.onChange(value === 'true')}
                      defaultValue={field.value ? 'true' : 'false'}
                      className="flex gap-6"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal text-md cursor-pointer">
                          Si
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal text-md cursor-pointer">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div style={{ margin: '0 auto', marginTop: '20px' }}>
            <Button variant="onboardingButton" disabled={isLoading}>
              Continuar
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FaArrowRight />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SecondStep;

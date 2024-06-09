import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { BankDetailsFormSchema } from '@/schemas/form';
import { bankEntitiesPY } from '@/lib/bank-entities-py';
import IdentificationNumberField from '../../../shared/identification-number-field-input';
import { updateBankDetails } from '@/actions/data/bank-details';
import { BankDetails } from '@prisma/client';
import ModalSubmitButton from '../modal-submit-button';

type BankDetailsFormProps = {
  eventId: string | undefined;
  bankDetails: BankDetails | null;
};

const BankDetailsForm = ({ eventId, bankDetails }: BankDetailsFormProps) => {
  const form = useForm({
    resolver: zodResolver(BankDetailsFormSchema),
    defaultValues: {
      eventId: eventId ?? '',
      bankName: bankDetails?.bankName ?? '',
      accountHolder: bankDetails?.accountHolder ?? '',
      accountNumber: bankDetails?.accountNumber ?? '',
      accountType: bankDetails?.accountType ?? '',
      identificationType: bankDetails?.identificationType ?? '',
      identificationNumber: bankDetails?.identificationNumber ?? '',
      razonSocial: bankDetails?.razonSocial ?? '',
      ruc: bankDetails?.ruc ?? '',
    },
  });

  const { formState } = form;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof BankDetailsFormSchema>) => {
    setIsLoading(true);
    if (!Object.keys(formState.dirtyFields).length) {
      setIsLoading(false);
      return;
    }
    const validatedFields = BankDetailsFormSchema.safeParse(values);
    if (validatedFields.success) {
      const response = await updateBankDetails(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error! 😢',
          description: response.error,
        });
      }

      toast({
        title: 'Exito! 🔗🎉',
        description: 'Tus datos bancarios han sido actualizados correctamente.',
        className: 'bg-white',
      });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-between"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-[#4B5563]">
                Datos bancários para recibir el monto de tus regalos.
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="accountHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre y apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. Santiago Dominguez"
                        className="!mt-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Entidad</FormLabel>
                    <FormControl className="!mt-1">
                      <Combobox
                        options={bankEntitiesPY}
                        placeholder="Elegí una entidad"
                        selected={field.value}
                        onChange={field.onChange}
                        width="w-96"
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2 justify-between w-full">
                <FormField
                  control={form.control}
                  name="identificationType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tipo de documento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="!mt-1 text-base">
                          <SelectTrigger>
                            <SelectValue placeholder="Documento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="ci">
                            <span className="font-semibold">CI - </span>Cédula
                            de Identidad
                          </SelectItem>
                          <SelectItem value="ruc">
                            <span className="font-semibold">RUC - </span>
                            Registro Único de Contribuyentes
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="font-normal text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="identificationNumber"
                  render={({ field }) => (
                    <IdentificationNumberField field={field} />
                  )}
                />
              </div>

              <div className="flex items-center gap-2 justify-between w-full">
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Número de cuenta</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. 61920381"
                          className="!mt-1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-normal text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Moneda de la cuenta</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="!mt-1 text-base">
                          <SelectTrigger>
                            <SelectValue placeholder="Moneda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="pyg">
                            <span className="font-semibold">PYG - </span>
                            Guaraníes
                          </SelectItem>
                          <SelectItem value="usd">
                            <span className="font-semibold">USD - </span>Dolares
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="font-normal text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-[#4B5563]">Datos de facturación</h3>
            </div>
            <div className="flex items-center gap-2 justify-between w-full">
              <FormField
                control={form.control}
                name="razonSocial"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Razón social</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre"
                        className="!mt-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ruc"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>CI o RUC</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Documento"
                        className="!mt-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <ModalSubmitButton isLoading={isLoading} formState={formState} />
      </form>
    </Form>
  );
};

export default BankDetailsForm;

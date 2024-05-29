import React, { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { BankDetailsFormSchema } from '@/schemas/form';
import { bankEntitiesPY } from '@/lib/bank-entities-py';

const BankDetailsForm = () => {
  const [typeSelected, setTypeSelected] = useState<string>('');
  const [options, setOptions] = useState(
    bankEntitiesPY.map(option => ({
      value: option.value.toString(),
      label: option.label,
    }))
  );

  const form = useForm({
    resolver: zodResolver(BankDetailsFormSchema),
    defaultValues: {
      entityType: '',
      entityName: '',
      accountHolder: '',
      identificationType: 'ruc',
      identificationNumber: '',
      accountNumber: '',
      accountCurrency: '',
      razonSocial: '',
      ruc: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-[#4B5563]">
              Datos bancários para recibir el monto de tus regalos.
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 justify-between w-full">
              <FormField
                control={form.control}
                name="entityType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de entidad</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="!mt-1">
                        <SelectTrigger>
                          <SelectValue placeholder="Elegí tu entidad kp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="ci">Banco</SelectItem>
                        <SelectItem value="ruc">Cooperativa</SelectItem>
                        <SelectItem value="passport">Financiera</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entityName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Entidad</FormLabel>
                    <FormControl className="!mt-1">
                      <Combobox
                        options={options}
                        placeholder="Elegí una entidad"
                        selected={typeSelected}
                        onChange={value => {
                          setTypeSelected(
                            Array.isArray(value) ? value[0] : value
                          ); // what is thiss!!!! need to change
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="accountHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre y apellido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Santiago Dominguez"
                      className="!mt-1"
                      {...field}
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
                      <FormControl className="!mt-1">
                        <SelectTrigger>
                          <SelectValue placeholder="Elegí tu documento kp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="ci">C.I.</SelectItem>
                        <SelectItem value="ruc">RUC</SelectItem>
                        <SelectItem value="passport">Pasaporte</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identificationNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Número de documento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="4.420.420"
                        className="!mt-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
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
                        placeholder="61920381"
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
                name="accountCurrency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Moneda de la cuenta</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="!mt-1">
                        <SelectTrigger>
                          <SelectValue placeholder="Moneda de tu cuenta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="ci">Guaranies</SelectItem>
                        <SelectItem value="ruc">Dolares</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
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
                    <Input placeholder="Nombre" className="!mt-1" {...field} />
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
        <Button variant="editGiftButton" type="submit" className="mt-5">
          Guardar
        </Button>
      </form>
    </Form>
  );
};

export default BankDetailsForm;

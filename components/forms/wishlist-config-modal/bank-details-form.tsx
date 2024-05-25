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
import { Combobox } from '@/components/ui/combobox';
import { BankDetailsFormSchema } from '@/schemas/form';
import { bankEntitiesPY } from '@/lib/bank-entities-py';

const BankDetailsForm = () => {
  const form = useForm({
    resolver: zodResolver(BankDetailsFormSchema),
    defaultValues: {
      bankEntity: '',
      accountHolder: '',
      identificationType: '',
      identificationNumber: '',
      accountNumber: '',
      accountCurrency: '',
      razonSocial: '',
      ruc: '',
    },
  });

  const [typeSelected, setTypeSelected] = useState<string | string[]>('');
  const [options, setOptions] = useState(
    bankEntitiesPY.map(option => ({
      value: option.value.toString(),
      label: option.label,
    }))
  );

  const handleCreateOptions = (value: string) => {
    const newOption = { value, label: value };
    setOptions([...options, newOption]);
    setTypeSelected(value);
  };

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-[#4B5563]">
              Datos bancários para recibir el monto de tus regalos.
            </h3>
          </div>
          <div>
            <FormField
              control={form.control}
              name="bankEntity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entidad</FormLabel>
                  <FormControl className="!mt-1">
                    <Combobox
                      mode="single"
                      options={options}
                      placeholder="Elegi una entidad bancaria"
                      selected={typeSelected}
                      onChange={value => {
                        setTypeSelected(value);
                        field.onChange(value);
                      }}
                      onCreate={handleCreateOptions}
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

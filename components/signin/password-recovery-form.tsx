'use client';

import { passwordRecovery } from '@/actions/auth/password-recorvery';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { PasswordRecoverySchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthFormButton from './auth-form-button';

export default function PasswordRecorveryForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PasswordRecoverySchema>>({
    resolver: zodResolver(PasswordRecoverySchema),
  });

  async function handlePasswordRecorvery(
    values: z.infer<typeof PasswordRecoverySchema>
  ) {
    setIsLoading(true);
    const validatedFields = PasswordRecoverySchema.safeParse(values);
    if (validatedFields.success) {
      const response = await passwordRecovery(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Uh Oh! Error al tratar de recuperar tu contraseña',
          description: response.error,
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePasswordRecorvery)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tucorreo@wedin.app"
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

        <AuthFormButton isLoading={isLoading} label="Enviar link a tu Correo" />
      </form>
    </Form>
  );
}

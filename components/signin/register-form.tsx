'use client';

import { login } from '@/actions/auth/login';
import { register } from '@/actions/auth/register';
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
import { LoginSchema, RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';
import AuthFormButton from './auth-form-button';

export default function RegisterForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      eventType: 'wedding',
    },
  });

  async function handleRegister(values: z.infer<typeof RegisterSchema>) {
    setIsLoading(true);

    const validatedFields = LoginSchema.safeParse(values);
    if (validatedFields.success) {
      let response = await register(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error al registrar usuario.',
          description: response.error,
        });

        setIsLoading(false);
        return null;
      }

      response = await login(
        'credentials',
        validatedFields.data,
        '/onboarding'
      );

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error al iniciar sesión.',
          description: response.error,
          action: <MdErrorOutline fontSize={'52px'} />,
        });

        setIsLoading(false);
        return null;
      }
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
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

          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creá una contraseña</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        {...field}
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Wedin!538461$"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="ml-[-32px]"
                      >
                        {isPasswordVisible ? (
                          <IoEyeOffOutline size={20} />
                        ) : (
                          <IoEyeOutline size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="font-normal text-yellow-600" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <AuthFormButton label="Registrarme" isLoading={isLoading} />
      </form>
    </Form>
  );
}
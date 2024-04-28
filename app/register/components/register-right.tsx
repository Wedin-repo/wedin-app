'use client';

import { login } from '@/actions/login';
import { register } from '@/actions/register';
import SociaMediaLoginForm from '@/components/signin/socia-media-login-form';
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
import { useToast } from '@/components/ui/use-toast';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';

const RegisterRight = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      eventType: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
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
    <div className="w-full max-w-lg p-0 lg:p-8 bg-white text-black">
      <p className="text-2xl sm:text-3xl text-center font-semibold text-primaryTextColor">
        Registrate en 3 minutos y creá tu lista de regalos
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-8"
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
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
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

          <Button
            type="submit"
            variant="primaryButton"
            className="rounded-lg"
            disabled={isLoading}
          >
            Registarme
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col items-center justify-between py-8">
        <span className="w-1/2 border-b border" />
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-secondaryTextColor">O registate con</span>
        <SociaMediaLoginForm provider="google" callbackUrl="/onboarding" />
        <SociaMediaLoginForm provider="facebook" callbackUrl="/onboarding" />
      </div>

      <Link
        href="/login"
        className="flex items-center justify-center text-secondaryTextColor mt-6"
      >
        Ya tenés una cuenta?&nbsp;
        <span className="text-indigo-600 hover:underline">Ingresá aquí</span>
      </Link>
    </div>
  );
};

export default RegisterRight;

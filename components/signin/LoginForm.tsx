'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IoEyeOffOutline, IoEyeOutline, IoGiftOutline } from 'react-icons/io5';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Tu email no puede estar vacío' })
    .email('Email inválido'),
  password: z
    .string()
    .min(8, { message: 'Tu contraseña debe tener al menos 8 caracteres' })
    .max(255, { message: `Slow down cowboy, you're not Julian Assange` }),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isMagicLinkLogin, setIsMagicLinkLogin] = useState(false);

  const getUserByEmail = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/login/${email}`);
      const data = await response.json();
      //console.log(response, data);
      if (!response.ok) {
        throw new Error(
          data.error || 'An error occurred while fetching user data.'
        );
      }
      setIsMagicLinkLogin(data.isMagicLinkLogin);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to fetch user data.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //setIsMagicLinkLogin(false);
    setIsLoading(true);
    const { email, password } = values;

    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      //console.log(response);

      if (response?.error === 'Invalid password') {
        toast({
          variant: 'destructive',
          title: 'Uh Oh! Error al iniciar sesión.',
          description: 'Email o Contraseña incorrecta.',
        });
      }

      if (response?.ok) {
        router.push('/');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }

    try {
    } catch (error) {
      console.error('Error in onSubmit:', error);
      //showErrorToast('Error inesperado', 'Por favor intente más tarde.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
                      //onBlur={() => getUserByEmail(field.value)}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-yellow-600" />
                </FormItem>
              )}
            />
          </div>
          {!isMagicLinkLogin && (
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input
                          {...field}
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder="TuContraseña!52419$"
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
          )}
        </div>
        {isLoading ? (
          <Button
            type="submit"
            variant="primaryButton"
            className="rounded-lg"
            disabled
          >
            Iniciar sesión
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button type="submit" variant="primaryButton" className="rounded-lg">
            Iniciar sesión
          </Button>
        )}
      </form>
    </Form>
  );
}

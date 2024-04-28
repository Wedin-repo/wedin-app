// TODO refactor to use form action
'use client';

import { signIn } from '@/auth';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoEyeOffOutline, IoEyeOutline, IoGiftOutline } from 'react-icons/io5';
import { LuPartyPopper } from 'react-icons/lu';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';

const RegisterRight = () => {
  const router = useRouter();
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

  async function registerUser(email: string, password: string) {
    return await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  }

  async function loginUser(email: string, password: string) {
    signIn('credentials', {
      email,
      password,
      redirect: false,
    }).then(callback => {
      if (callback?.ok) {
        router.push('/onboarding');
      }
    });
  }

  function showErrorToast(title: string, description: string) {
    toast({
      variant: 'destructive',
      title: title,
      description: description,
      action: <MdErrorOutline fontSize={'52px'} />,
    });
  }

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    const { email, password } = values;

    const registerResponse = await registerUser(email, password);

    if (!registerResponse.ok) {
      const data = await registerResponse.json();
      const errorMessage =
        data.error === 'Email already in use'
          ? 'Este email ya está registrado.'
          : 'Ocurrió un error al crear tu cuenta, intenta de vuelta.';

      showErrorToast('Uh oh! Algo salió mal.', errorMessage);
      setIsLoading(false);
      return;
    }

    loginUser(email, password);

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

            <div className="flex flex-col gap-2" style={{ display: 'block' }}>
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>Tipo de evento</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de evento" />
                      </SelectTrigger>
                      <SelectContent className="z-10 bg-white">
                        <SelectGroup>
                          <SelectItem
                            value="wedding"
                            className="border-b-[1px]"
                            defaultChecked
                          >
                            <div className="flex items-center gap-2 cursor-pointer">
                              <IoIosHeartEmpty fontSize={'18px'} />
                              <span>Boda</span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="birthday"
                            className="border-b-[1px]"
                          >
                            <div className="flex items-center gap-2 cursor-pointer">
                              <IoGiftOutline fontSize={'18px'} />
                              <span>Cumpleaños</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="other">
                            <div className="flex items-center gap-2 cursor-pointer">
                              <LuPartyPopper fontSize={'18px'} />
                              <span>Otros</span>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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

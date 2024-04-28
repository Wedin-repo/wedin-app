'use client';

import { login } from '@/actions/login';
import LoginFormButton from './login-form-button';
import { useToast } from '../ui/use-toast';

export default function SignInGoogle() {
  const { toast } = useToast();
  const handleSignIn = async () => {
    const response = await login('google');

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh Oh! Error al iniciar sesión.',
        description: response.error,
      });
    }
  };

  return (
    <form action={handleSignIn}>
      <LoginFormButton variant="socialMediaLoginButton" />
    </form>
  );
}

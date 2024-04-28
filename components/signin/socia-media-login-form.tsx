'use client';

import { login } from '@/actions/login';
import { useToast } from '../ui/use-toast';
import LoginFormButton from './login-form-button';

type SocialMediaLoginFormType = {
  socialMedia: 'google' | 'facebook';
};
function SociaMediaLoginForm({ socialMedia }: SocialMediaLoginFormType) {
  const { toast } = useToast();
  const handleSignIn = async () => {
    const response = await login(socialMedia);

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
      <LoginFormButton variant="socialMediaLoginButton" label={socialMedia} />
    </form>
  );
}

export default SociaMediaLoginForm;

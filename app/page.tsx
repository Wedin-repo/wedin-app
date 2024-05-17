import { getCurrentUser } from '@/actions/get-current-user';
import { redirect } from 'next/navigation';

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/gifts');
  } else {
    redirect('/dashboard');
  }
}

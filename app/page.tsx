import Container from '../components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/gifts');
  } else {
    redirect('/dashboard');
  }

  return (
    <Container>
      <div className="min-h-screen flex flex-col justify-center items-center w-full text-3xl">
        go to /dashboard.
      </div>
    </Container>
  );
}

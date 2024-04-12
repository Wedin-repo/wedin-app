import { redirect } from 'next/navigation';
import Container from '../components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';
import Link from 'next/link';

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/login');
  return (
    <Container>
      <div className="min-h-screen flex flex-col justify-center items-center w-full">
        hi, go to /dashboard. <br />
        <p className="flex gap-1">
          if you can't go because you're disabled just{' '}
          <Link href="/dashboard" className="hover:underline text-blue-500">
            click here
          </Link>
        </p>
      </div>
    </Container>
  );
}

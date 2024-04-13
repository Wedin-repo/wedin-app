import { Link } from 'lucide-react';
import Container from '../components/Container';

export default async function Home() {
  return (
    <Container>
      <div className="min-h-screen flex flex-col justify-center items-center w-full">
        hi, go to /dashboard. <br />
        <p className="flex gap-1">
          if you can&apos;t go because you&apos;re disabled just{' '}
          <Link href="/dashboard" className="hover:underline text-blue-500">
            click here
          </Link>
        </p>
      </div>
    </Container>
  );
}

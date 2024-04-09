import { redirect } from 'next/navigation';
import Container from '../components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/login'); 
  return (
    <Container>
      <div className="min-h-screen flex flex-col justify-center items-center w-full">
        en esta pagina se muestra el dashboard de los novios donde estan sus
        regalos anhadidos
      </div>
    </Container>
  );
}

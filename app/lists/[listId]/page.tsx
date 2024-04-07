import Container from '@/components/Container';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/getCurrentUser';

type Props = {
  params: {
    listId: string;
  };
};

export default async function Home({ params }: Props) {
  const currentUser = await getCurrentUser();

  // Add logic for when currnetUser is null or does not
  // have access to the list with the given id redirect to
  // home page

  if (!currentUser) {
    redirect('/');
  }

  const { listId } = params;

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center">
        list with id&nbsp;
        <span className="font-medium">{listId}</span>
      </div>
    </Container>
  );
}

import { redirect } from 'next/navigation';
import Container from '@/components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/login');
  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start mt-12 sm:mt-12 px-4 sm:px-10">
        <div className="flex flex-col items-center gap-3 w-full ">
          <h1 className="text-4xl font-medium text-primaryTextColor">
            Mi lista
          </h1>
          <div className="flex items-center gap-3">
            <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-sm">
              25 regalos
            </div>
            <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-sm">
              Gs. 45.000.000
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </Container>
  );
}

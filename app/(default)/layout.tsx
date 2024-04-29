import { getCurrentUser } from '@/actions/getCurrentUser';
import { auth } from '@/auth';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import NavBar from '@/components/navbar/Navbar';

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const currentUser = await getCurrentUser();

  return (
    <>
      <NavBar currentUser={currentUser} session={session} />
      <div className="pt-16" />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}

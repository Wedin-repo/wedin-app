import { getCurrentUser } from '@/actions/getCurrentUser';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import NavBar from '@/components/navbar/Navbar';

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <div className="sm:flex sm:flex-col sm:min-h-[100vh]">
      <NavBar currentUser={currentUser} />
      <div className="pt-16" />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}

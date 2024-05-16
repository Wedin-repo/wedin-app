import { getCurrentUser } from '@/actions/getCurrentUser';
import DefaultLayoutContainer from '@/components/default-layout-container';
import Footer from '@/components/footer';
import NavBar from '@/components/navbar/navbar';

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
      <DefaultLayoutContainer>{children}</DefaultLayoutContainer>
      <Footer />
    </div>
  );
}

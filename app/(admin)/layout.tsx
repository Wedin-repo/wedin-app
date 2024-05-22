import { getCurrentUser } from '@/actions/get-current-user';
import AdminNavBar from '@/components/admin-navbar/navbar';
import DefaultLayoutContainer from '@/components/default-layout-container';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <div className="sm:flex sm:flex-col sm:min-h-[100vh]">
      <AdminNavBar currentUser={currentUser} />
      <div className="pt-16" />
      <DefaultLayoutContainer>{children}</DefaultLayoutContainer>
      <div className="bg-[#333333] w-full h-[90px] flex items-center justify-center font-medium text-xl text-white mt-auto">
        wedin
      </div>
    </div>
  );
}

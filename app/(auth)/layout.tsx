import Logo from '@/components/Logo';

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[100vh]">
      <Logo />
      {children}
    </div>
  );
}

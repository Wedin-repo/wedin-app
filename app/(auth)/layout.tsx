import Logo from '@/components/Logo';

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-[100vh] w-[85%]">
      <Logo height={38} />
      {children}
    </div>
  );
}

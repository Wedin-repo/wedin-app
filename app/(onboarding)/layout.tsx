export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-[100vh]">
      {children}
    </div>
  );
}

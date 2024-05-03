import NewPasswordForm from '@/components/signin/new-password-form';

export default function NewPasswordPage() {
  return (
    <div className="flex flex-col gap-8 justify-around items-center lg:flex-row sm:w-[440px] w-[85%]">
      <div className="flex flex-col gap-6 justify-start w-full h-full">
        <p className="text-2xl font-semibold text-center sm:text-3xl">
          Ingresá a tu Nueva Contraseña
        </p>

        <NewPasswordForm />
      </div>
    </div>
  );
}

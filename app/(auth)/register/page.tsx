import RegisterLeft from './components/register-left';
import RegisterRight from './components/register-right';

export default async function RegisterPage() {
  return (
    <div className="flex flex-col gap-8 justify-around items-center lg:flex-row w-[85%]">
      <div className="hidden flex-grow justify-center items-center rounded-xl border lg:flex w-7/10 h-[600px] bg-secondaryBackgroundColor">
        <RegisterLeft />
      </div>
      <div className="flex justify-center items-center w-3/10 sm:w-[440px]">
        <RegisterRight />
      </div>
    </div>
  );
}

import { getTransactions } from '@/actions/data/transaction';
import { formatPrice } from '@/lib/utils';
import { IoGiftOutline } from 'react-icons/io5';
import { PiWallet } from 'react-icons/pi';

export default async function AdminHeader() {
  const { totalAmount, transactions } = await getTransactions();
  const formattedTotalPrice = formatPrice(totalAmount ?? 0);
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h1 className="text-4xl font-semibold text-primaryTextColor">Mi lista</h1>
      <div className="flex flex-col gap-3 items-center sm:flex-row">
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2">
          <IoGiftOutline fontSize={'18px'} />
          {transactions?.length ?? 0} regalos
        </div>
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2">
          <PiWallet fontSize={'18px'} />
          {formattedTotalPrice}
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-start w-full sm:flex-row sm:justify-center" />
    </div>
  );
}

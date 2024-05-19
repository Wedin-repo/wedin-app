import type { GiftsReceivedPageSearchParams } from '../page';
import WalletOverview from './wallet-overview';
import WislistGiftTransactions from './wishlist-gifts-transactions';

type WalletProps = {
  searchParams: GiftsReceivedPageSearchParams;
};

function Wallet({ searchParams }: WalletProps) {
  return (
    <div className="flex flex-row gap-5 mt-10 w-full">
      <div className="w-2/5 bg-blue-100">
        <WalletOverview />
      </div>

      <div className="w-3/5 bg-blue-100">
        <WislistGiftTransactions searchParams={searchParams} />
      </div>
    </div>
  );
}

export default Wallet;

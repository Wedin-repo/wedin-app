import EventDetailsForm from './event-details-form';
import WishlistUrlForm from './wishlist-url-form';
import WishlistCoverImgForm from './wishlist-cover-img-form';
import WishlistMessageForm from './wishlist-cover-message-form';
import EventDateForm from './event-date-form';
import BankDetailsForm from './bank-details-form';

type WishlistConfigModalRightProps = {
  contentId: string | null;
};

const WishlistConfigModalRight = ({
  contentId,
}: WishlistConfigModalRightProps) => {
  if (contentId === '1') return <EventDetailsForm />;
  if (contentId === '2') return <WishlistUrlForm />;
  if (contentId === '3') return <WishlistCoverImgForm />;
  if (contentId === '4') return <WishlistMessageForm />;
  if (contentId === '5') return <EventDateForm />;
  if (contentId === '6') return <BankDetailsForm />;
  return null;
};

export default WishlistConfigModalRight;

import EventDetailsForm from './event-details-form';
import WishlistUrlForm from './wishlist-url-form';
import WishlistCoverImgForm from './wishlist-cover-img-form';
import WishlistMessageForm from './wishlist-cover-message-form';
import EventDateForm from './event-date-form';
import BankDetailsForm from './bank-details-form';

type WishlistConfigModalRightProps = {
  content: string | null;
};

const WishlistConfigModalRight = ({
  content,
}: WishlistConfigModalRightProps) => {
  if (content === 'Tipo y datos del evento') {
    return <EventDetailsForm />;
  }

  if (content === 'Link de la lista') {
    return <WishlistUrlForm />;
  }

  if (content === 'Imagen de la portada') {
    return <WishlistCoverImgForm />;
  }

  if (content === 'Mensaje de la portada') {
    return <WishlistMessageForm />;
  }

  if (content === 'Fecha del evento') {
    return <EventDateForm />;
  }

  if (content === 'Datos bancarios y de facturación') {
    return <BankDetailsForm />;
  }
};

export default WishlistConfigModalRight;

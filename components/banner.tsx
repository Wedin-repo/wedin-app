import type { User } from '@prisma/client';

type BannerProps = {
  primaryUser: User | null;
  secondaryUser: User | null;
  eventDate: Date | null;
  eventCoverMessage: string | null;
};

function Banner({
  primaryUser,
  secondaryUser,
  eventDate,
  eventCoverMessage,
}: BannerProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Fecha de evento sin decidir';
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  return (
    <div className="flex flex-row p-10 w-full h-[270px] bg-Gray600 rounded-2xl">
      <div className="flex flex-col justify-center gap-1 items-start w-2/5">
        <p className="text-3xl md:text-4xl font-medium text-Primary700">
          {primaryUser?.name} & {''} {secondaryUser?.name}
        </p>
        <p className="text-xl md:text-2xl text-Secondary400">
          {eventDate ? formatDate(eventDate) : 'Fecha de evento sin decidir'}
        </p>
      </div>

      <div className="flex items-center w-3/5">
        <p className="text-xl md:text-2xl text-Primary300 max-w-3xl">
          {eventCoverMessage ??
            'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia.'}
        </p>
      </div>
    </div>
  );
}

export default Banner;

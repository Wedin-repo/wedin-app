import type { User } from '@prisma/client';

type BannerProps = {
  primayUser: User | null;
  secondaryUser: User | null;
  eventDate: Date | null;
};

function Banner({ primayUser, secondaryUser, eventDate }: BannerProps) {
  console.log({ eventDate: eventDate });
  return (
    <div className="flex flex-row p-2 w-full h-[270px] bg-primaryBorderColor">
      <div className="w-1/12" />

      <div className="flex flex-col justify-center items-start w-4/12">
        <p>
          {primayUser?.name} & {''} {secondaryUser?.name}
        </p>
        <p className="text-2xl">
          {eventDate?.toLocaleDateString() ?? 'Todavia sin decidir'}
        </p>
      </div>

      <div className="flex flex-row justify-center items-center w-6/12">
        <p>
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
          commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
          Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          consectetur et est culpa et culpa duis.
        </p>
      </div>
    </div>
  );
}

export default Banner;

import Image from 'next/image';

type AvatarProps = {
  src?: string | null;
};

const Avatar = ({ src }: AvatarProps) => {
  const img = src || '/images/avatar.jpg';

  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="avatar"
      src={img}
    />
  );
};

export default Avatar;

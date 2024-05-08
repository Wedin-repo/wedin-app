import Image from 'next/image';

type AvatarProps = {
  src?: string | null | undefined;
};

const Avatar: React.FC<AvatarProps> = ({ src }) => {
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

import { Loader2 } from 'lucide-react';

type LoaderProps = {
  mfHeight?: string;
};

const Loader = ({ mfHeight }: LoaderProps) => {
  const loaderHeight = mfHeight ?? 'min-h-[50vh]';

  return (
    <div className={`flex justify-center items-center ${loaderHeight}`}>
      <Loader2 className="w-20 h-20 animate-spin text-secondaryBorderColor" />
    </div>
  );
};

export default Loader;

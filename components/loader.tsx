import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <Loader2 className="w-20 h-20 animate-spin text-secondaryBorderColor" />
    </div>
  );
};

export default Loader;

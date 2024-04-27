import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader2 className="h-20 w-20 animate-spin text-secondaryBorderColor" />
    </div>
  );
};

export default Loader;

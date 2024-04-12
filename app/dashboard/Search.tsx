
import useFilterModal from "@/app/hooks/useFilterModal";
import { Input } from "@/components/ui/input";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

function Search() {
  /* const { open } = useFilterModal();
  const params = useSearchParams();
  const startDateValue = params?.get("startDate");
  const endDateValue = params?.get("endDate");
  const guestCountValue = params?.get("guestCount");

  const durationLabel = useMemo(() => {
    if (startDateValue && endDateValue) {
      const start = new Date(startDateValue as string);
      const end = new Date(endDateValue as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) diff = 1;

      return `${diff} days`;
    }
    return "Any Week";
  }, [startDateValue, endDateValue]);

  const guestCountLabel = useMemo(() => {
    if (guestCountValue) return `${guestCountValue} guests`;

    return "Add Guest";
  }, [guestCountValue]); */

  return (
    <div
      className="bg-[#F2F2F2] w-full md:w-auto py-1.5 pl-4 pr-1.5 rounded-full flex items-center gap-2"
    >
      <BiSearch fontSize={'22px'} />
      <Input className="bg-transparent border-0 rounded-full text-md pl-2" placeholder="Buscar" />
    </div>
  );
}

export default Search;

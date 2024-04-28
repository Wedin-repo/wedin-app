'use client';

import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const setPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <PaginationShadcn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`#${currentPage - 1}`}
            onClick={e => {
              e.preventDefault();
              setPage(currentPage - 1);
            }}
            className="hover:bg-borderColor transition-colors"
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`#${page}`}
              onClick={e => {
                e.preventDefault();
                setPage(page);
              }}
              isActive={currentPage === page}
              className={
                currentPage == page
                  ? 'p-2 h-8 w-9 bg-borderColor'
                  : 'border border-borderColor p-2 h-8 w-9 hover:bg-borderColor transition-colors'
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationEllipsis />
        <PaginationItem>
          <PaginationNext
            href={`#${currentPage + 1}`}
            onClick={e => {
              e.preventDefault();
              setPage(currentPage + 1);
            }}
            className="hover:bg-borderColor transition-colors"
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadcn>
  );
}

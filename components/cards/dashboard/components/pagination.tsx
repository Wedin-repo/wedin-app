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
import React from 'react';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const paginationRange = () => {
    const range = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      range.push(1); // always include the first page
      if (currentPage !== 1 && currentPage !== totalPages) {
        range.push(currentPage); // include the current page if it's not the first or the last
      }
      range.push(totalPages); // always include the last page
    }
    return range;
  };

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
            href={`#${currentPage - 2}`}
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) setPage(currentPage - 1);
            }}
            className={`hover:bg-borderColor transition-colors ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          />
        </PaginationItem>
        {paginationRange().map((page, index, arr) => (
          <React.Fragment key={page}>
            {index > 0 && arr[index - 1] !== page - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                href={`#${page}`}
                onClick={e => {
                  e.preventDefault();
                  setPage(page);
                }}
                isActive={currentPage === page}
                className={
                  currentPage === page
                    ? 'p-2 h-8 w-9 bg-borderColor'
                    : 'border border-borderColor p-2 h-8 w-9 hover:bg-borderColor transition-colors'
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          </React.Fragment>
        ))}
        <PaginationItem>
          <PaginationNext
            href={`#${currentPage + 1}`}
            onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages) setPage(currentPage + 1);
            }}
            className={`hover:bg-borderColor transition-colors ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadcn>
  );
}

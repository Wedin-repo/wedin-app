'use client';

import type { TransactionStatusLog, User } from '@prisma/client';
import { useState } from 'react';
import { MdHistory } from 'react-icons/md';
import type { TransactionsCardProps } from '../cards/transactions-cards';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function ShowTransactionLogModal({ transaction }: TransactionsCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="editIconButton" size="iconButton">
          <MdHistory fontSize={'16px'} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl ">
        <DataTable columns={columns} data={transaction.transactionStatusLogs} />
      </DialogContent>
    </Dialog>
  );
}
export default ShowTransactionLogModal;

const columns: ColumnDef<TransactionStatusLog & { changedBy: User }>[] = [
  {
    accessorKey: 'changedBy.name',
    header: 'Changed By',
  },
  {
    accessorKey: 'previousStatus',
    header: 'Previous Status',
  },
  {
    accessorKey: 'status',
    header: 'Current Status',
  },
  {
    accessorKey: 'changedAt',
    header: 'Changed At',
    cell: ({ row }) => {
      const value = row.getValue('changedAt') as string;
      return new Date(value).toLocaleString();
    },
  },
];

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
};

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

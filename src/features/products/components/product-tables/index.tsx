'use client';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableAdvancedToolbar } from '@/components/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@/components/data-table/data-table-filter-list';
import { DataTableSortList } from '@/components/data-table/data-table-sort-list';
import { useDataTable } from '@/hooks/use-data-table';
import { Product } from '@/constants/data';
import { parseAsInteger, useQueryState } from 'nuqs';
import { ProductColumns } from './columns';

interface ProductTableProps {
  data: Product[];
  totalItems: number;
}

export function ProductTable({ data, totalItems }: ProductTableProps) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));

  const columns = ProductColumns();

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data, 
    columns, 
    pageCount: pageCount,
    enableAdvancedFilter: true,
    shallow: false, 
    debounceMs: 500
  });

  return (
    <DataTable table={table}>
      <DataTableAdvancedToolbar table={table}>
        <DataTableFilterList table={table} />
        <DataTableSortList table={table} />
      </DataTableAdvancedToolbar>
    </DataTable>
  );
}

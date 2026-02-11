'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Product } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { getCategoryOptions } from './options';
import { useI18n } from '@/components/providers/i18n-provider';

export function ProductColumns() {
  const { t } = useI18n();
  const categoryOptions = getCategoryOptions();

  return [
    {
      accessorKey: 'photo_url',
      header: t('products.image'),
      cell: ({ row }: any) => {
        return (
          <div className='relative aspect-square'>
            <Image
              src={row.getValue('photo_url')}
              alt={row.getValue('name')}
              fill
              className='rounded-lg'
            />
          </div>
        );
      }
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: { column: Column<Product, unknown> }) => (
        <DataTableColumnHeader column={column} label={t('products.name')} />
      ),
      cell: ({ cell }: any) => <div>{cell.getValue() as string}</div>,
      meta: {
        label: t('products.name'),
        placeholder: t('products.searchPlaceholder'),
        variant: 'text',
        icon: Text
      },
      enableColumnFilter: true
    },
    {
      id: 'category',
      accessorKey: 'category',
      header: ({ column }: { column: Column<Product, unknown> }) => (
        <DataTableColumnHeader column={column} label={t('products.category')} />
      ),
      cell: ({ cell }: any) => {
        const status = cell.getValue() as Product['category'];
        const Icon = status === 'active' ? CheckCircle2 : XCircle;

        return (
          <Badge variant='outline' className='capitalize'>
            <Icon />
            {status}
          </Badge>
        );
      },
      enableColumnFilter: true,
      meta: {
        label: t('products.categories'),
        variant: 'multiSelect',
        options: categoryOptions
      }
    },
    {
      accessorKey: 'price',
      header: t('products.price')
    },
    {
      accessorKey: 'description',
      header: t('products.description')
    },

    {
      id: 'actions',
      cell: ({ row }: any) => <CellAction data={row.original} />
    }
  ] as ColumnDef<Product>[];
}

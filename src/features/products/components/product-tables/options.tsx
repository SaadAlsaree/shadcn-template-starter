import { useI18n } from '@/components/providers/i18n-provider';

export const getCategoryOptions = () => {
  const { t } = useI18n();

  return [
    { value: 'Electronics', label: t('products.categories.electronics') },
    { value: 'Furniture', label: t('products.categories.furniture') },
    { value: 'Clothing', label: t('products.categories.clothing') },
    { value: 'Toys', label: t('products.categories.toys') },
    { value: 'Groceries', label: t('products.categories.groceries') },
    { value: 'Books', label: t('products.categories.books') },
    { value: 'Jewelry', label: t('products.categories.jewelry') },
    { value: 'Beauty Products', label: t('products.categories.beauty') }
  ];
};

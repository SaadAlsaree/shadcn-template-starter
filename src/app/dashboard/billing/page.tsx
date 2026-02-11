'use client';

import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Check } from 'lucide-react';
import { billingInfoContent } from '@/config/infoconfig';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/components/providers/i18n-provider';

export default function BillingPage() {
  const { t } = useI18n();

  const plans = [
    {
      name: t('billing.free'),
      price: '$0',
      description: t('billing.freeDescription'),
      features: [
        t('billing.upTo3Members'),
        t('billing.1GBStorage'),
        t('billing.standardSupport')
      ],
      buttonText: t('billing.currentPlan'),
      current: true
    },
    {
      name: t('billing.pro'),
      price: '$19',
      description: t('billing.proDescription'),
      features: [
        t('billing.unlimitedMembers'),
        t('billing.10GBStorage'),
        t('billing.prioritySupport'),
        t('billing.advancedAnalytics')
      ],
      buttonText: t('billing.upgradeToPro'),
      current: false
    }
  ];

  return (
    <PageContainer
      infoContent={billingInfoContent}
      pageTitle={t('billing.title')}
      pageDescription={t('billing.description')}
    >
      <div className='space-y-6'>
        {/* Info Alert */}
        <Alert>
          <Info className='h-4 w-4' />
          <AlertDescription>{t('billing.manageSubscription')}</AlertDescription>
        </Alert>

        <div className='grid gap-6 md:grid-cols-2'>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.current ? 'border-primary' : ''}
            >
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  {plan.name}
                  <span className='text-2xl font-bold'>
                    {plan.price}
                    <span className='text-muted-foreground text-sm font-normal'>
                      {t('billing.perMonth')}
                    </span>
                  </span>
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <ul className='text-muted-foreground space-y-2 text-sm'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='flex items-center gap-2'>
                      <Check className='text-primary h-4 w-4' />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className='w-full'
                  variant={plan.current ? 'outline' : 'default'}
                  disabled={plan.current}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

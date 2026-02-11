'use client';

import PageContainer from '@/components/layout/page-container';
import { workspacesInfoContent } from '@/config/infoconfig';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/components/providers/i18n-provider';
import { MinimalTiptapEditor } from '@/components/ui/minimal-tiptap';
import { useState } from 'react';
import { Content } from '@tiptap/react';

export default function WorkspacesPage() {
  const router = useRouter();
  const [value, setValue] = useState<Content>('');
  const { t } = useI18n();

  const organizations = [
    { id: 'org_1', name: 'Acme Inc', role: t('workspaces.admin') },
    { id: 'org_2', name: 'Globex Corp', role: t('workspaces.member') }
  ];

  return (
    <PageContainer
      pageTitle={t('workspaces.title')}
      pageDescription={t('workspaces.description')}
      infoContent={workspacesInfoContent}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {t('workspaces.yourOrganizations')}
          </h2>
          <Button onClick={() => alert('Add Organization Clicked')}>
            {t('workspaces.createOrganization')}
          </Button>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {organizations.map((org) => (
            <Card
              key={org.id}
              className='hover:bg-accent/50 cursor-pointer transition-colors'
              onClick={() => router.push('/dashboard/workspaces/team')}
            >
              <CardHeader>
                <CardTitle>{org.name}</CardTitle>
                <CardDescription>{org.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground text-xs'>
                  {t('workspaces.clickToManage')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <MinimalTiptapEditor
          value={value}
          onChange={setValue}
          className='w-full'
          editorContentClassName='p-5'
          output='html'
          placeholder='Enter your description...'
          autofocus={true}
          editable={true}
          editorClassName='focus:outline-hidden'
        />
      </div>
    </PageContainer>
  );
}

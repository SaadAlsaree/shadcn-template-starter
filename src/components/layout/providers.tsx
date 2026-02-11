'use client';
import React from 'react';
import { ActiveThemeProvider } from '../themes/active-theme';
import { I18nProvider } from '@/components/providers/i18n-provider';
import { LayoutProvider, useLayout } from '@/contexts/layout-context';
import { UserProvider } from '@/contexts/user-context';
import { DirectionProvider } from '@/components/ui/direction';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <ActiveThemeProvider initialTheme={activeThemeValue}>
      <I18nProvider>
        <LayoutProvider>
          <UserProvider>
            <DirectionWrapper>{children}</DirectionWrapper>
          </UserProvider>
        </LayoutProvider>
      </I18nProvider>
    </ActiveThemeProvider>
  );
}

function DirectionWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useLayout();
  return (
    <DirectionProvider direction={settings.direction}>
      {children}
    </DirectionProvider>
  );
}

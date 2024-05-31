import { QueryClientProvider } from '@tanstack/react-query';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import { RouterProvider } from 'react-router-dom';

import { CenterContainer, Loader } from '@ez/web-ui';
import { AuthProvider } from './auth-provider';
import { queryClient } from '../common/utils/query-client';
import { router } from '../routes';

export const Providers = () => {
  const locale = document.documentElement.lang;

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <I18nProvider locale={locale} messages={[messages]}>
          <RouterProvider
            router={router}
            fallbackElement={
              <CenterContainer>
                <Loader />
              </CenterContainer>
            }
            future={{ v7_startTransition: true }}
          />
        </I18nProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

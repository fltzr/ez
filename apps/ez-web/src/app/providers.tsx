import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {
  I18nProvider,
  type I18nProviderProps,
  importMessages,
} from '@cloudscape-design/components/i18n';
import { router } from '../routes';
import { Loader } from '@ez/web-ui';

const queryClient = new QueryClient();

export const Providers = () => {
  const locale = document.documentElement.lang || 'en';
  const [messages, setMessages] = useState<I18nProviderProps['messages']>([]);

  useEffect(() => {
    const loadI18nMessages = async () => {
      const msgs = await importMessages(locale);

      setMessages(msgs);
    };

    loadI18nMessages().catch((error) =>
      console.error(`Error while loading i18n messages: ${JSON.stringify(error, null, 2)}`)
    );
  }, [locale]);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale={locale} messages={messages}>
        <RouterProvider
          router={router}
          fallbackElement={<Loader />}
          future={{ v7_startTransition: true }}
        />
      </I18nProvider>
    </QueryClientProvider>
  );
};

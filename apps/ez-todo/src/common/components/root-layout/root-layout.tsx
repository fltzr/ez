import { Suspense } from 'react';
import { AppLayout } from '@cloudscape-design/components';
import { Outlet } from 'react-router-dom';

import { useAppLayoutStore } from '@ez/web-state-management';
import { CenterContainer, Loader, Navigation } from '@ez/web-ui';
import { useClearNotifications } from '../../hooks/use-clear-notifications';
import { Header } from '../header/header';
import { Notifications } from '../notification/notification';

const RootLayout = () => {
  const appLayoutStore = useAppLayoutStore();

  useClearNotifications();

  return (
    <Suspense
      fallback={
        <CenterContainer>
          <Loader />
        </CenterContainer>
      }
    >
      <Header />
      <AppLayout
        stickyNotifications
        contentType={appLayoutStore.contentLayout}
        headerSelector='#h'
        footerSelector='#f'
        navigation={
          <Navigation
            items={[
              {
                type: 'link',
                text: 'Dashboard',
                href: '/',
              },
              {
                type: 'link',
                text: 'Todos',
                href: '/todos',
              },
            ]}
          />
        }
        navigationWidth={175}
        navigationOpen={appLayoutStore.isNavigationOpen}
        tools={appLayoutStore.toolsContent ?? undefined}
        toolsHide={appLayoutStore.toolsContent === undefined}
        splitPanel={appLayoutStore.splitPanelContent}
        splitPanelOpen={appLayoutStore.isSplitPanelOpen}
        notifications={<Notifications />}
        content={
          <Suspense
            fallback={
              <CenterContainer>
                <Loader />
              </CenterContainer>
            }
          >
            <Outlet />
          </Suspense>
        }
        onNavigationChange={({ detail: { open } }) => {
          appLayoutStore.setNavigationOpen(open);
        }}
        onToolsChange={({ detail: { open } }) => {
          appLayoutStore.setToolsOpen(open);
        }}
        onSplitPanelToggle={({ detail: { open } }) => {
          appLayoutStore.setSplitPanelOpen(open);
        }}
        drawers={appLayoutStore.drawerPanels}
      />
    </Suspense>
  );
};

export const Component = RootLayout;

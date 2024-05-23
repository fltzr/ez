import { AppLayout } from '@cloudscape-design/components';
import { Outlet } from 'react-router-dom';

import { useAppLayoutStore } from '@ez/web-state-management';
import { Navigation } from '@ez/web-ui';
import { useClearNotifications } from '../../hooks/use-clear-notifications';
import { Header } from '../header/header';
import { Notifications } from '../notification/notification';

const RootLayout = () => {
  const appLayoutStore = useAppLayoutStore();

  useClearNotifications();

  return (
    <>
      <Header />
      <AppLayout
        stickyNotifications
        contentType={appLayoutStore.contentLayout}
        headerSelector='#h'
        footerSelector='#f'
        navigation={<Navigation />}
        navigationOpen={appLayoutStore.isNavigationOpen}
        tools={appLayoutStore.toolsContent ?? undefined}
        toolsHide={appLayoutStore.toolsContent === undefined}
        splitPanel={appLayoutStore.splitPanelContent}
        splitPanelOpen={appLayoutStore.isSplitPanelOpen}
        notifications={<Notifications />}
        content={<Outlet />}
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
    </>
  );
};

export const Component = RootLayout;

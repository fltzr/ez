import { Outlet } from 'react-router-dom';
import { AppLayout } from '@cloudscape-design/components';
import { useAppLayoutStore } from '@ez/web-state-management';
import { Navigation } from '@ez/web-ui';
import { Notifications } from '../notification/notification';
import { Header } from '../header/header';
import { useClearNotifications } from '../../hooks/use-clear-notifications';

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
        toolsOpen={appLayoutStore.isToolsOpen}
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
      />
    </>
  );
};

export const Component = RootLayout;

import { nanoid } from 'nanoid';
import {
  type FlashbarProps,
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  HelpPanel,
  SpaceBetween,
  SplitPanel,
} from '@cloudscape-design/components';
import { Mode as Theme, Density } from '@cloudscape-design/global-styles';
import { useAppLayoutStore } from '../store/use-app-layout-store';
import { Breadcrumbs } from '../common/components/breadcrumbs/breadcrumbs';
import { useNotificationStore } from '../store/use-notification-store';

const ExampleToolsContent = () => {
  const title = 'Tools content example';

  return (
    <HelpPanel header={<Header variant='h2'>{title}</Header>}>
      <Header variant='h3'>{title}</Header>
      <p>
        This is an example of tools content. It can be anything you want, like a form, a list of
        links, or a custom component.
      </p>
    </HelpPanel>
  );
};

const ExampleSplitPanelContent = () => {
  const title = 'Split panel content example';

  return (
    <SplitPanel header={title}>
      <Breadcrumbs />
    </SplitPanel>
  );
};

const ToggleThemeAndDensityActions = () => {
  const appLayoutStore = useAppLayoutStore((s) => ({
    theme: s.theme,
    density: s.density,
    setTheme: s.setTheme,
    setDensity: s.setDensity,
  }));

  return (
    <SpaceBetween size='m' direction='horizontal'>
      <Button
        wrapText
        variant='normal'
        onClick={() => {
          appLayoutStore.setTheme(appLayoutStore.theme === Theme.Light ? Theme.Dark : Theme.Light);
        }}
      >
        Toggle theme
      </Button>
      <Button
        wrapText
        variant='normal'
        onClick={() => {
          appLayoutStore.setDensity(
            appLayoutStore.density === Density.Comfortable ? Density.Compact : Density.Comfortable
          );
        }}
      >
        Toggle density
      </Button>
    </SpaceBetween>
  );
};

const ToggleToolsAndSplitPanelActions = () => {
  const appLayoutStore = useAppLayoutStore((s) => ({
    toolsContent: s.toolsContent,
    isToolsOpen: s.isToolsOpen,
    splitPanelContent: s.splitPanelContent,
    isSplitPanelOpen: s.isSplitPanelOpen,
    setToolsContent: s.setToolsContent,
    setToolsOpen: s.setToolsOpen,
    setSplitPanelContent: s.setSplitPanelContent,
    setSplitPanelOpen: s.setSplitPanelOpen,
  }));

  return (
    <ColumnLayout columns={2} minColumnWidth={120}>
      <Button
        wrapText
        variant='normal'
        disabled={!appLayoutStore.toolsContent}
        onClick={() => {
          appLayoutStore.setToolsOpen(!appLayoutStore.isToolsOpen);
        }}
      >
        Toggle tool panel
      </Button>

      <Button
        wrapText
        variant='normal'
        disabled={!appLayoutStore.splitPanelContent}
        onClick={() => {
          appLayoutStore.setSplitPanelOpen(!appLayoutStore.isSplitPanelOpen);
        }}
      >
        Toggle split panel
      </Button>

      <Button
        wrapText
        variant='primary'
        onClick={() => {
          if (appLayoutStore.toolsContent) {
            appLayoutStore.setToolsContent(undefined);
            appLayoutStore.setToolsOpen(false);
          } else {
            appLayoutStore.setToolsContent(<ExampleToolsContent />);
            appLayoutStore.setToolsOpen(true);
          }
        }}
      >
        Add/remove content to tool panel
      </Button>

      <Button
        wrapText
        variant='primary'
        onClick={() => {
          if (appLayoutStore.splitPanelContent) {
            appLayoutStore.setSplitPanelContent(undefined);
            appLayoutStore.setSplitPanelOpen(false);
          } else {
            appLayoutStore.setSplitPanelContent(<ExampleSplitPanelContent />);
            appLayoutStore.setSplitPanelOpen(true);
          }
        }}
      >
        Add/remove content to split panel
      </Button>
    </ColumnLayout>
  );
};

const types: FlashbarProps.Type[] = ['error', 'in-progress', 'info', 'success', 'warning'];

const getRandomType = () => {
  const randomIndex = Math.floor(Math.random() * types.length);

  return types[randomIndex];
};

const NotificationActions = () => {
  const notificationStore = useNotificationStore();

  return (
    <ColumnLayout columns={2}>
      <Button
        wrapText
        variant='primary'
        onClick={() => {
          const uid = nanoid(10);
          const randomType = getRandomType();

          notificationStore.addNotification({
            id: uid,
            type: randomType,
            header: `notification ${uid}`,
            content: (
              <>
                This is a <Box variant='code'>{randomType}</Box> notification.
              </>
            ),
            dismissible: true,
          });
        }}
      >
        Dispatch notification
      </Button>
    </ColumnLayout>
  );
};

const Home = () => {
  const { theme, density, isToolsOpen, isSplitPanelOpen } = useAppLayoutStore((s) => ({
    theme: s.theme,
    density: s.density,
    isToolsOpen: s.isToolsOpen,
    isSplitPanelOpen: s.isSplitPanelOpen,
  }));

  return (
    <SpaceBetween size='xxl' direction='vertical'>
      <ColumnLayout columns={2}>
        <Container
          fitHeight
          header={<Header variant='h2'>usePreferences()</Header>}
          footer={<ToggleThemeAndDensityActions />}
        >
          <ColumnLayout columns={2}>
            <div>
              <Box variant='awsui-gen-ai-label'>Theme</Box>
              <Box variant='awsui-value-large'>{theme}</Box>
            </div>
            <div>
              <Box variant='awsui-gen-ai-label'>Density</Box>
              <Box variant='awsui-value-large'>{density}</Box>
            </div>
          </ColumnLayout>
        </Container>
        <Container
          fitHeight
          header={<Header variant='h2'>Set tools and split panel state and content</Header>}
          footer={<ToggleToolsAndSplitPanelActions />}
        >
          <ColumnLayout columns={2}>
            <div>
              <Box variant='awsui-gen-ai-label'>Tools</Box>
              <Box variant='awsui-value-large'>{isToolsOpen ? 'Open' : 'Closed'}</Box>
            </div>
            <div>
              <Box variant='awsui-gen-ai-label'>Split panel</Box>
              <Box variant='awsui-value-large'>{isSplitPanelOpen ? 'Open' : 'Closed'}</Box>
            </div>
          </ColumnLayout>
        </Container>
      </ColumnLayout>
      <ColumnLayout columns={2}>
        <Container fitHeight header={<Header variant='h2'>Notification actions</Header>}>
          <NotificationActions />
        </Container>
        <div></div>
      </ColumnLayout>
    </SpaceBetween>
  );
};

export const Component = Home;

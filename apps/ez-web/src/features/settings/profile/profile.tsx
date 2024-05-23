import { Box, Button, Header, SpaceBetween } from '@cloudscape-design/components';

import { Breadcrumbs } from '@ez/web-ui';
import { AccountSettingsContainer } from './components/account-settings-container';
import { AlternateContactsContainer } from './components/alternate-contacts-container';
import { ContactInformationContainer } from './components/contact-information/container';

const SettingsProfile = () => {
  return (
    <Box padding={{ horizontal: 'm' }}>
      <SpaceBetween direction='vertical' size='m'>
        <Breadcrumbs />
        <Header variant='h3' actions={<Button variant='primary'>Close account</Button>}>
          Account
        </Header>
        <SpaceBetween direction='vertical' size='xl'>
          <AccountSettingsContainer />
          <ContactInformationContainer />
          <AlternateContactsContainer />
        </SpaceBetween>
      </SpaceBetween>
    </Box>
  );
};

export const Component = SettingsProfile;

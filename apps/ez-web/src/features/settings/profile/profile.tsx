import {
  Box,
  Button,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components';
import { AccountSettingsContainer } from './components/account-settings-container';
import { ContactInformationContainer } from './components/contact-information-container';
import { AlternateContactsContainer } from './components/alternate-contacts-container';
import { Breadcrumbs } from '../../../common/components/breadcrumbs/breadcrumbs';

const SettingsProfile = () => {
  return (
    <Box padding={{ horizontal: 'm' }}>
      <SpaceBetween direction="vertical" size="m">
        <Breadcrumbs />
        <Header
          variant="h3"
          actions={<Button variant="primary">Close account</Button>}
        >
          Account
        </Header>
        <SpaceBetween direction="vertical" size="xl">
          <AccountSettingsContainer />
          <ContactInformationContainer />
          <AlternateContactsContainer />
        </SpaceBetween>
      </SpaceBetween>
    </Box>
  );
};

export const Component = SettingsProfile;

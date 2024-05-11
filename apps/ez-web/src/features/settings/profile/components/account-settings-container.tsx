import { Button, Container, Header } from '@cloudscape-design/components';

export const AccountSettingsContainer = () => {
  // AccountSettingsContainer logic here
  return (
    <Container
      variant='stacked'
      header={
        <Header
          variant='h2'
          actions={
            <Button iconName='external' iconAlign='right'>
              Edit
            </Button>
          }
        >
          Account settings
        </Header>
      }
    ></Container>
  );
};

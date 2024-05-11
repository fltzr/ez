import { Button, Container, Header } from '@cloudscape-design/components';

export const AlternateContactsContainer = () => {
  // AlternateContactsContainer logic here
  return (
    <Container
      variant='stacked'
      header={
        <Header variant='h2' actions={<Button>Edit</Button>}>
          Alternate contacts
        </Header>
      }
    ></Container>
  );
};

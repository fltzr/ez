import {
  Box,
  Button,
  Container,
  Grid,
  Header,
  Icon,
  SpaceBetween,
} from '@cloudscape-design/components';

import { SignInForm } from './form';
import { BaseLayout } from '../components/base-layout/base-layout';
import { useSubmitSignin } from '../data-access/auth';

const SignInHeader = () => (
  <Header variant='h2' description='Use your ez account or sign in with a provider.'>
    Sign in
  </Header>
);

const SignInFormActions = () => {
  const submitSignIn = useSubmitSignin();

  return (
    <Box float='right'>
      <SpaceBetween size='m' direction='horizontal'>
        <Button>Create account</Button>
        <Button
          variant='primary'
          form='form__sign-in'
          formAction='submit'
          loading={submitSignIn.isPending}
        >
          Sign in
        </Button>
      </SpaceBetween>
    </Box>
  );
};

const SignIn = () => {
  return (
    <BaseLayout>
      <Container
        fitHeight
        media={{
          position: 'top',
          content: (
            <div style={{ marginLeft: 25, marginTop: 25 }}>
              <Icon size='big' name='angle-right-double' />
            </div>
          ),
        }}
      >
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 6 } },
            { colspan: { default: 12, xxs: 6 } },
          ]}
        >
          <SignInHeader />

          <SpaceBetween size='xxl'>
            <SignInForm />
            <SignInFormActions />
          </SpaceBetween>
        </Grid>
      </Container>
    </BaseLayout>
  );
};

export const Component = SignIn;

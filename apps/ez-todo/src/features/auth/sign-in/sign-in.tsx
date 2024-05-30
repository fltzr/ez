import { useState } from 'react';
import type { AuthError } from '@supabase/supabase-js';
import { useIsMutating } from '@tanstack/react-query';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Header,
  Icon,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'react-use';

import { SignInForm } from './form';
import { useAuthStore } from '../../../store/use-auth-store';
import { BaseLayout } from '../components/base-layout/base-layout';

const SignInHeader = () => (
  <Header variant='h2' description='Use your ez account or sign in with a provider.'>
    Sign in
  </Header>
);

const SignInFormActions = () => {
  const navigate = useNavigate();
  const signInMutationState = useIsMutating({ mutationKey: ['mutation_sign-in'], exact: true });

  return (
    <Box float='right'>
      <SpaceBetween size='m' direction='horizontal'>
        <Button
          onClick={(event) => {
            event.preventDefault();
            navigate('/signup');
          }}
        >
          Create account
        </Button>
        <Button
          variant='primary'
          form='form__sign-in'
          formAction='submit'
          loading={!!signInMutationState}
        >
          Sign in
        </Button>
      </SpaceBetween>
    </Box>
  );
};

const SignIn = () => {
  const { state: previousLocation } = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [serverError, setServerError] = useState<AuthError | null>(null);

  useEffectOnce(() => {
    console.log('location.state: ', previousLocation);

    if (user) {
      navigate('/');
    }
  });

  return (
    <BaseLayout>
      <Container
        fitHeight
        media={{
          position: 'top',
          content: (
            <div style={{ marginLeft: 25, marginTop: 25 }}>
              {' '}
              <Icon size='big' name='angle-right-double' />
            </div>
          ),
        }}
      >
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 5 } },
            { colspan: { default: 12, xxs: 7 } },
          ]}
        >
          <SignInHeader />

          <SpaceBetween size='xxl'>
            <SignInForm
              onSuccessfulSignIn={() => {
                console.log(`Signed in! Redirecting to ${previousLocation?.from ?? '/'}`);

                navigate(previousLocation?.from ?? '/');
              }}
              onServerError={(error) => {
                setServerError(error);
              }}
            />
            {serverError && (
              <Alert
                dismissible
                statusIconAriaLabel='Error:'
                type='error'
                onDismiss={() => {
                  setServerError(null);
                }}
              >
                {serverError.message}
              </Alert>
            )}
            <SignInFormActions />
          </SpaceBetween>
        </Grid>
      </Container>
    </BaseLayout>
  );
};

export const Component = SignIn;

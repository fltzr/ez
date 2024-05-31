import { useState } from 'react';
import type { AuthError } from '@supabase/supabase-js';
import { useIsMutating } from '@tanstack/react-query';
import type { LinkProps } from '@cloudscape-design/components';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Link,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'react-use';

import { SignUpForm } from './form';
import { useAuthStore } from '../../../store/use-auth-store';
import { BaseLayout } from '../components/base-layout/base-layout';

const SignUpHeader = () => {
  const navigate = useNavigate();

  const handleOnClick: LinkProps['onFollow'] = (event) => {
    event.preventDefault();

    navigate('/signin', { replace: true });
  };

  return (
    <SpaceBetween direction='vertical' size='m'>
      <Header variant='h2' description='Register for an ez account in a few easy steps.'>
        Sign up
      </Header>
      <div>
        <Box variant='span'>Already have an account? </Box>
        <Link variant='secondary' href='/signin' onFollow={handleOnClick}>
          Sign in
        </Link>
      </div>
    </SpaceBetween>
  );
};

const SignUpFormActions = () => {
  const signInMutationState = useIsMutating({ mutationKey: ['mutation__sign-up'], exact: true });

  return (
    <Box float='right'>
      <SpaceBetween size='m' direction='horizontal'>
        <Button
          variant='primary'
          form='form__sign-up'
          formAction='submit'
          loading={!!signInMutationState}
        >
          Sign up
        </Button>
      </SpaceBetween>
    </Box>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [serverError, setServerError] = useState<AuthError | null>(null);

  useEffectOnce(() => {
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
              <Icon size='big' name='edit' />
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
          <SignUpHeader />
          <SpaceBetween size='xxl'>
            <SignUpForm
              onSuccessfulSignIn={() => {
                console.log('Signed up successfully! Redirecting to app...');

                navigate('/');
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
            <SignUpFormActions />
          </SpaceBetween>
        </Grid>
      </Container>
    </BaseLayout>
  );
};

export const Component = SignUp;

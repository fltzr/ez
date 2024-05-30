import { Container, Grid, Header, Icon } from '@cloudscape-design/components';

import { SignUpForm } from './form';
import { supabase } from '../../../common/utils/supabase-client';
import { BaseLayout } from '../components/base-layout/base-layout';

const SignUpHeader = () => (
  <Header variant='h2' description='Register for an ez account in a few easy steps.'>
    Sign up
  </Header>
);

const SignUp = () => {
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
          <SignUpForm />
        </Grid>
      </Container>
    </BaseLayout>
  );
};

export const Component = SignUp;

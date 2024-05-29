import { useRef, useState } from 'react';
import { z } from 'zod';
import { SpaceBetween, Link } from '@cloudscape-design/components';

import { useNotificationStore } from '@ez/web-state-management';
import { BaseForm, FormInput } from '@ez/web-ui';
import { supabase } from '../../../common/utils/supabase-client';
import { useSubmitSignin } from '../data-access/auth';

const signInFormSchema = z.object({
  email: z.string({ message: 'Enter an email' }).email(),
  password: z.string({ message: 'Enter a password' }),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export const SignInForm = () => {
  const formRef = useRef<{ reset: () => void }>(null);
  const addNotification = useNotificationStore((s) => s.addNotification);

  const submitSignIn = useSubmitSignin();

  return (
    <BaseForm<SignInFormSchema>
      formId='form__sign-in'
      formRef={formRef}
      zodSchema={signInFormSchema}
      onSubmit={async (data) => {
        const { user, session } = await submitSignIn.mutateAsync(data);

        console.log(`user: ${JSON.stringify(user, null, 2)}`);
        console.log(`session: ${JSON.stringify(session, null, 2)}`);

        if (submitSignIn.isError) {
          console.log(`submitSignIn.error: ${JSON.stringify(submitSignIn.error, null, 2)}`);
          addNotification({ type: 'error', header: submitSignIn.error.message });
          return;
        }

        console.log(`signInResponse: ${JSON.stringify(submitSignIn.data, null, 2)}`);
      }}
      onError={(error) => console.log(`onError: ${JSON.stringify(error, null, 2)}`)}
    >
      <SpaceBetween size='xxl'>
        <SpaceBetween size='xs'>
          <FormInput
            stretch
            disableBrowserAutocorrect
            spellcheck={false}
            name='email'
            placeholder='Email'
          />
          <Link fontSize='body-s'>Forgot email?</Link>
        </SpaceBetween>

        <SpaceBetween size='xs'>
          <FormInput
            stretch
            disableBrowserAutocorrect
            spellcheck={false}
            name='password'
            type='password'
            placeholder='Password'
          />
          <Link fontSize='body-s'>Forgot password?</Link>
        </SpaceBetween>
      </SpaceBetween>
    </BaseForm>
  );
};

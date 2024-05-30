import { useRef } from 'react';
import type { AuthError } from '@supabase/supabase-js';
import { z } from 'zod';
import { SpaceBetween, Link } from '@cloudscape-design/components';

import { BaseForm, FormInput } from '@ez/web-ui';
import { useSubmitSignin } from '../data-access/auth';

const signInFormSchema = z.object({
  email: z.string({ message: 'Enter an email' }).email(),
  password: z
    .string({ message: 'Enter a password' })
    .min(8, { message: 'Password must be at least 8 characters' }),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

type SignInFormProps = {
  onSuccessfulSignIn?: () => void;
  onServerError?: (error: AuthError | null) => void;
};

export const SignInForm = ({ onSuccessfulSignIn, onServerError }: SignInFormProps) => {
  const formRef = useRef<{ reset: () => void }>(null);
  const submitSignIn = useSubmitSignin();

  return (
    <BaseForm<SignInFormSchema>
      formId='form__sign-in'
      formRef={formRef}
      zodSchema={signInFormSchema}
      onSubmit={async (data) => {
        const {
          data: { user, session },
          error,
        } = await submitSignIn.mutateAsync(data);

        if (error) {
          onServerError?.(error);
          return;
        }

        console.log(`user: ${JSON.stringify(user, null, 2)}`);
        console.log(`session: ${JSON.stringify(session, null, 2)}`);

        onSuccessfulSignIn?.();
      }}
      onError={(error) => console.log(`onError: ${JSON.stringify(error, null, 2)}`)}
    >
      <SpaceBetween size='xxl'>
        <SpaceBetween size='xs'>
          <FormInput
            disableBrowserAutocorrect
            spellcheck={false}
            name='email'
            label='Email'
            placeholder='example@email.com'
            info={<Link fontSize='body-s'>Forgot Email?</Link>}
          />
        </SpaceBetween>

        <SpaceBetween size='xs'>
          <FormInput
            sensitive
            disableBrowserAutocorrect
            spellcheck={false}
            name='password'
            type='password'
            label='Password'
            placeholder='Password'
            info={<Link fontSize='body-s'>Forgot password?</Link>}
          />
        </SpaceBetween>
      </SpaceBetween>
    </BaseForm>
  );
};

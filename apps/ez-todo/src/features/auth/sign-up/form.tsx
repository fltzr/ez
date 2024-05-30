import { useRef } from 'react';
import type { AuthError } from '@supabase/supabase-js';
import { date, z } from 'zod';
import { Box, ColumnLayout, SpaceBetween } from '@cloudscape-design/components';

import { BaseForm, FormDatePicker, FormInput } from '@ez/web-ui';
import { useSubmitSignUp } from '../data-access/auth';

const signUpSchema = z
  .object({
    firstName: z.string({ message: 'What is your first name?' }).min(2),
    lastName: z.string({ message: 'What is your last name?' }).min(2),
    dateOfBirth: z.string().date('A valid date of birth is required.'),

    email: z.string().email({ message: 'A valid email address is required.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  })
  .refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match.' })
  .refine(
    (data) => data.dateOfBirth && date().parse(data.dateOfBirth) < date().parse('2003-01-01'),
    { message: 'You must be at least 18 years old to sign up.' }
  );

type SignUpSchema = z.infer<typeof signUpSchema>;

type SignUpFormProps = {
  onSuccessfulSignIn?: () => void;
  onServerError?: (error: AuthError | null) => void;
};

export const SignUpForm = ({ onSuccessfulSignIn, onServerError }: SignUpFormProps) => {
  const formRef = useRef<{ reset: () => void }>(null);
  const submitSignUp = useSubmitSignUp();

  return (
    <BaseForm<SignUpSchema>
      zodSchema={signUpSchema}
      formRef={formRef}
      formId='form__sign-up'
      onSubmit={async (data) => {
        const {
          data: { user, session },
          error,
        } = await submitSignUp.mutateAsync(data);

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
      <ColumnLayout columns={2}>
        <FormInput name='firstName' label='First name' />
        <FormInput name='lastName' label='Last name' />
      </ColumnLayout>
      <Box margin={{ top: 'm' }}>
        <SpaceBetween direction='vertical' size='m'>
          <FormDatePicker
            name='dateOfBirth'
            label='Date of birth'
            placeholder='YYYY-MM-DD'
            constraintText='Use YYYY-MM-DD format.'
          />
          <FormInput name='email' placeholder='example@email.com' />
          <FormInput name='password' />
          <FormInput name='confirmPassword' />
        </SpaceBetween>
      </Box>
    </BaseForm>
  );
};

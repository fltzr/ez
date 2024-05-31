import { useRef } from 'react';
import type { AuthError } from '@supabase/supabase-js';
import { z } from 'zod';
import { Box, ColumnLayout, SpaceBetween } from '@cloudscape-design/components';

import { BaseForm, FormDatePicker, FormInput } from '@ez/web-ui';
import { useSubmitSignUp } from '../data-access/auth';

const signUpSchema = z
  .object({
    firstName: z.string({ message: 'What is your first name?' }).min(2),
    lastName: z.string({ message: 'What is your last name?' }).min(2),
    dateOfBirth: z.coerce.date({ message: 'A valid date of birth is required.' }).refine(
      (date) => {
        return !isNaN(date.getTime()) && date < new Date('2003-01-01');
      },
      { message: 'You must be at least 18 years old to register.' }
    ),

    email: z.string().email({ message: 'A valid email address is required.' }),
    password: z
      .string({ message: 'A password is required.' })
      .min(6, { message: 'Password must be at least 6 characters long.' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  })
  .refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match.' });

export type SignUpSchema = z.infer<typeof signUpSchema>;

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
        <FormInput name='firstName' label='First name' placeholder='Enter your first name' />
        <FormInput name='lastName' label='Last name' placeholder='Enter your last name' />
      </ColumnLayout>
      <Box margin={{ top: 'm' }}>
        <SpaceBetween direction='vertical' size='m'>
          <FormDatePicker
            name='dateOfBirth'
            label='Date of birth'
            placeholder='YYYY-MM-DD'
            constraintText='Use YYYY-MM-DD format.'
          />
          <FormInput name='email' label='Email' placeholder='example@email.com' />
          <ColumnLayout columns={2}>
            <FormInput sensitive name='password' label='Password' placeholder='Password' />
            <FormInput
              sensitive
              name='confirmPassword'
              label='Confirm Password'
              placeholder='Confirm password'
            />
          </ColumnLayout>
        </SpaceBetween>
      </Box>
    </BaseForm>
  );
};

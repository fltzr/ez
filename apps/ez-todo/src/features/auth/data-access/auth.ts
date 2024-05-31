import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../../common/utils/supabase-client';
import type { SignUpSchema } from '../sign-up/form';

const submitSignIn = async (data: SignInWithPasswordCredentials) => {
  const signInResponse = await supabase.auth.signInWithPassword(data);

  return signInResponse;
};

const submitSignUp = async (data: SignUpSchema) => {
  const { email, password, confirmPassword, ...rest } = data;

  const signUpResponse = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { ...rest },
    },
  });

  return signUpResponse;
};

export const useSubmitSignin = () =>
  useMutation({
    mutationKey: ['mutation__sign-in'],
    mutationFn: submitSignIn,
    retry: false,
  });

export const useSubmitSignUp = () =>
  useMutation({
    mutationKey: ['mutation__sign-up'],
    mutationFn: submitSignUp,
    retry: false,
  });

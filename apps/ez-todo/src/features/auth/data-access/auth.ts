import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { supabase } from '../../../common/utils/supabase-client';
import { useMutation } from '@tanstack/react-query';

const submitSignIn = async (data: SignInWithPasswordCredentials) => {
  const signInResponse = await supabase.auth.signInWithPassword(data);

  return signInResponse;
};

const submitSignUp = async (data: SignUpWithPasswordCredentials) => {
  const signUpResponse = await supabase.auth.signInWithPassword(data);

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

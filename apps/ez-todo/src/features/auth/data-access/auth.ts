import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { supabase } from '../../../common/utils/supabase-client';
import { useMutation } from '@tanstack/react-query';

const submitSignIn = async (data: SignInWithPasswordCredentials) => {
  const { data: signInResponse, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(`Error signing in: ${error.message}`);
  }

  return signInResponse;
};

export const useSubmitSignin = () =>
  useMutation({
    mutationFn: submitSignIn,
    retry: false,
  });

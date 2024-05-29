import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { supabase } from './supabase-client';

export const requireAuthLoader = async ({ request }: LoaderFunctionArgs) => {
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect('/signin');
  }

  return null;
};

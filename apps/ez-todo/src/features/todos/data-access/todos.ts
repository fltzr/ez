import { supabase } from '../../../common/utils/supabase-client';

export const getTodos = async () => {
  const { data, error } = await supabase.from('todo').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

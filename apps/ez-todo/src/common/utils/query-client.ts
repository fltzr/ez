import { MutationCache, QueryClient, matchQuery } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.refetchQueries({
        predicate: (query) =>
          mutation.meta?.invalidates?.some((queryKey) => matchQuery({ queryKey }, query)) ?? true,
      });
    },
  }),
});

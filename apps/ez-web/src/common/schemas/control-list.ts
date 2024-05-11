import { z } from 'zod';

export const permittedActions = z.object({
  value: z.enum(['SELECT', 'UPDATE', 'DELETE']),
  label: z.string(),
});

export const controlListSchema = z.object({
  permittedActions: z.array(permittedActions).min(1, 'At least one action is required.'),
  accessType: z.object({
    value: z.enum(['ROLE', 'GROUP', 'USER']),
    label: z.string(),
  }),

  grantedTo: z.string().min(3, 'granted to field may not be empty.'),
});

export type ControlList = z.infer<typeof controlListSchema>;

import { z } from 'zod';
import { controlListSchema } from '../../../common/schemas/control-list';

export const createMetaItemSchema = z.object({
  name: z
    .string({ message: 'A valid name is required.' })
    .min(1, 'A valid name is required.'),
  controlList: z
    .array(controlListSchema)
    .nonempty('At least one control is required.'),
});

export type CreateMetaItem = z.infer<typeof createMetaItemSchema>;

import { z } from 'zod';
import { controlListSchema } from '../../../common/schemas/control-list';

export const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  catalogCategory: z.object({ value: z.string(), label: z.string() }),
  manufacturer: z.object({ value: z.string(), label: z.string() }),
  productType: z.object({ value: z.string(), label: z.string() }),
  controlList: z
    .array(controlListSchema)
    .nonempty('At least one control list is required.'),
});

export type Product = z.infer<typeof productSchema>;

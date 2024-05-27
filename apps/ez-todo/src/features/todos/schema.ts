import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { z } from 'zod';

export const todoItemSchema = z.object({
  id: z.string().default(() => nanoid(5)),
  urgency: z.number().min(1).max(3).default(1).optional(),
  title: z
    .string({ message: 'Title is required for a todo item.' })
    .min(1, 'Title is required for a todo item.')
    .max(25, 'Title must be less than 25 characters.'),
  description: z.string().max(50, 'Description must be less than 25 characters.').optional(),
  status: z.enum(['success', 'in-progress', 'info']).default('in-progress'),
  dueDate: z
    .string({ message: 'Due date is required for a todo item.' })
    .date('Due date must be a valid date.')
    .optional()
    .default(() => DateTime.now().toFormat('yyyy-MM-dd')),
});

export type TodoItemSchema = z.infer<typeof todoItemSchema>;

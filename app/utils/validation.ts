import { z } from 'zod';
import { inventory } from '../data/inventory';

const validIds = inventory.map(item => item.id);

export const AIResponseSchema = z.object({
  matches: z.array(z.object({
    id: z.number().refine(id => validIds.includes(id), {
      message: "Invalid package ID - not in inventory"
    }),
    reason: z.string()
  }))
});

export type ValidatedAIResponse = z.infer<typeof AIResponseSchema>;
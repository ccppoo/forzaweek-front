import { z } from 'zod';

export const color = z.object({
  color: z.optional(z.string()).default('#000000'),
});

export type Color = z.infer<typeof color>;
export type ColorInput = z.input<typeof color>;

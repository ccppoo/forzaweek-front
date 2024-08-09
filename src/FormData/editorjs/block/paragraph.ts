import { z } from 'zod';

import { blockSchemaBase } from './base';

const paragraphBlockData = z.object({
  text: z.string({ description: 'html style' }).default(''),
});

export const paragraphBlockSchema = blockSchemaBase.merge(z.object({ data: paragraphBlockData }));

export type ParagraphBlockSchemaType = z.infer<typeof paragraphBlockSchema>;

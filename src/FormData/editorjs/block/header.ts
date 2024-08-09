import { z } from 'zod';

import { blockSchemaBase } from './base';

const headerBlockData = z.object({
  text: z.string({ description: 'html style' }).default(''),
  level: z.number().nonpositive().default(2),
});

export const headerBlockSchema = blockSchemaBase.merge(
  z.object({
    data: headerBlockData,
  }),
);

export type HeaderBlockSchemaType = z.infer<typeof headerBlockSchema>;

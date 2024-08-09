import { z } from 'zod';

import { blockSchemaBase } from './base';

// recursive zod define start
const baseNestedListItemType = z.object({
  content: z.string(),
});

type NestedListItemType = z.infer<typeof baseNestedListItemType> & {
  items: NestedListItemType[];
};

const blockDataNestedListItemType: z.ZodType<NestedListItemType> = baseNestedListItemType.extend({
  items: z.lazy(() => blockDataNestedListItemType.array()),
});
// recursive zod define end

const nestedListBlockData = z.object({
  style: z.string(),
  items: z.array(blockDataNestedListItemType).default([]),
});

export const nestedListBlockSchema = blockSchemaBase.merge(
  z.object({
    data: nestedListBlockData,
  }),
);

export type NestedListBlockSchemaType = z.infer<typeof nestedListBlockSchema>;

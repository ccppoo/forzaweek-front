import { z } from 'zod';

import { commentBase, commentsBase } from './base';

const taggable = z.object({
  tags: z.array(z.string()).default([]),
});

export const taggableComment = commentBase.merge(taggable);
export const taggableComments = commentsBase;

export type TaggableCommentType = z.infer<typeof taggableComment>;

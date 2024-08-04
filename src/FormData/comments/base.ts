import { z } from 'zod';

const commentBase = z.object({
  creator: z.string(),
  value: z.string(),
  created_at: z.date(),
  modified_at: z.optional(z.date()),
});

const votable = z.object({
  up_votes: z.number().nonnegative().default(0),
  down_votes: z.number().nonnegative().default(0),
});

export const votableComment = commentBase.merge(votable);

const haveVotableSubComments = z.object({
  subComments: z.array(votableComment),
});

export const votableMainComment = votableComment.merge(haveVotableSubComments);

const commentsBase = z.object({
  subject_to: z.string(),
  created_at: z.date(),
});

export const votableComments = commentsBase.merge(
  z.object({
    comments: z.array(votableComment).default([]),
  }),
);

export const comments = z.object({
  comments: z.array(z.string()).default([]),
});

export type Comments = z.infer<typeof comments>;
export type VotableComment = z.infer<typeof votableComment>;
export type VotableMainComment = z.infer<typeof votableMainComment>;

import { z } from 'zod';

import { commentBase, commentsBase } from './base';

const votedUser = z.object({
  up: z.array(z.string()).default([]),
  down: z.array(z.string()).default([]),
});

const votable = z.object({
  up_votes: z.number().nonnegative().default(0),
  down_votes: z.number().nonnegative().default(0),
  voted: votedUser,
});

export const votableComment = commentBase.merge(votable);

const haveVotableSubComments = z.object({
  // subComments에 subComment ID 반환votableComment
  subComments: z.array(z.string()).default([]),
});

export const votableMainComment = votableComment.merge(haveVotableSubComments);

export const votableComments = commentsBase;

export type VotedUserType = z.infer<typeof votedUser>;
export type VotableSubCommentType = z.infer<typeof votableComment>;
export type VotableMainCommentType = z.infer<typeof votableMainComment>;

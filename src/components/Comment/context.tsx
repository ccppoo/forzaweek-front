import { createContext } from 'react';

import type { CommentSortOption } from './types';

export type CommentReadOptions = {
  subject_id: string | undefined;
  page: number;
  order: CommentSortOption;
};

export type CommentReadOptionsContext = {
  commentReadOptions: CommentReadOptions;
  setCommentReadOptions: (
    commentReadOptions: keyof CommentReadOptions,
    value: number | string,
  ) => void;
};

export const commentReadOptionsDefault: CommentReadOptions = {
  subject_id: undefined,
  page: 1,
  order: 'Date' as CommentSortOption,
};

export const CommentContext = createContext<CommentReadOptionsContext>({
  commentReadOptions: commentReadOptionsDefault,
  setCommentReadOptions: (
    commentReadOption: keyof CommentReadOptions,
    value: number | string,
  ) => {},
});

// import type { OutputBlockData, OutputData } from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import { z } from 'zod';

import { documentBase } from '@/FormData/base';
import { carSimpleSchemaType } from '@/FormData/car';
import { Tag } from '@/FormData/tag';

import * as block from './block';
import type { NestedListBlockSchemaType } from './block/types';

// 글 쓰고 최종적으로 나오는 것

const outputBlockData = z.union([
  block.headerBlockSchema,
  block.nestedListBlockSchema,
  block.paragraphBlockSchema,
  block.imageBlockSchema,
]);

export type OutputBlockDataType = z.infer<typeof outputBlockData>;

const outputDataSchema = z.object({
  version: z.optional(z.string()),
  time: z.optional(z.number().nonnegative()),
  blocks: z.array(outputBlockData),
});

const _outputDataSchema = z.object({
  data: outputDataSchema,
});

type OutputDataType = z.infer<typeof outputDataSchema>;

export type OutputDataSchemaType = z.infer<typeof _outputDataSchema>;

const boardPostVote = z.object({
  vote: z.optional(
    z
      .object({
        up: z.number().nonnegative(),
        down: z.number().nonnegative(),
      })
      .default({
        up: 0,
        down: 0,
      }),
  ),
});

export const boardPostMetadata = z.object({
  user_id: z.undefined(z.string()), // 게시물 작성자 public user id
  uploaded_at: z.optional(z.date()), // 작성일
  modified_at: z.optional(z.date()), // 수정일
  comments: z.number().nonnegative().default(0),
});

export const boardPostTitle = z.object({
  title: z.optional(z.string().default('')),
});

export type BoardPostTitle = z.infer<typeof boardPostTitle>;

export const boardPostCategory = z.object({
  category: z.optional(z.string()),
});

export const outputSchema = documentBase
  .merge(boardPostTitle)
  .merge(_outputDataSchema) // 본문
  .merge(boardPostVote)
  .merge(boardPostMetadata);

const DEFAULT_INITIAL_DATA: OutputDataType = {
  blocks: [
    {
      type: 'header',
      data: {
        text: 'New note title...',
        level: 1,
      },
    },
  ],
};

export const outputSchemaDefault: OutputSchemaType = {
  id: undefined,
  comments: 0,
  data: DEFAULT_INITIAL_DATA,
  uploaded_at: undefined,
  modified_at: undefined,
  vote: undefined,
  user_id: undefined,
};

// 글쓰기 -> blob으로 일단 업로드 -> 글 작성시 백그라운드에서
// 1. 수정하고 최종으로 보낼 때
// 2. 최초 작성시 확정적으로 이미지 사용하는거 확인용
// added에 없는 경우 게시글 작성

type BoardEditFinal = {
  image: {
    deleted: string[];
    added: string[];
  };
};
// type BoardDataEditForm = OutputData & BoardEditFinal;

// // 읽을 때
// type BoardDataReadForm = OutputData;

export type OutputSchemaType = z.infer<typeof outputSchema>;

type boardPersonal = {
  saved: boolean; // 글 목록 저장 (레딧 save처럼)
  voted: 'up' | 'down'; // 회원인 경우 자신이 투표한 것
};

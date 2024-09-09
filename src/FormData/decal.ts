import { z } from 'zod';

import { carSimpleSchemaType } from '@/FormData/car';

import { documentBase } from './base';
import { image, tag } from './post';
import { car, sharingCreation, track } from './post/sharingCreation';
import { tagItemReadOnly } from './tag/tag';

export const decalEditSchema = documentBase
  .merge(sharingCreation)
  .merge(image.multipleImages)
  .merge(car.carDependent);
// .merge(tag.tagDependent);

export const decalSchemaType = decalEditSchema.required({
  id: true,
  car: true,
  creator: true,
  firstImage: true,
  imageURLs: true,
  share_code: true,
  // tags: true,
});

export type DecalSchemaType = z.infer<typeof decalSchemaType>;

export type DecalEditSchema = z.infer<typeof decalEditSchema>;

export const decalEditSchemaDefault: DecalEditSchema = {
  share_code: undefined, // 공유코드
  car: undefined, // 차 (id)
  creator: undefined, // 데칼 제작자

  imageURLs: [], // 데칼 사진
  firstImage: undefined,
  // tags: [], // 데칼 태그
};

export const decalSchemaReadType = z.object({
  id: z.string(), // 데칼 문서 id
  share_code: z.string(), // 공유코드
  creator: z.string(), // 데칼 제작자
  imageURLs: z.array(z.string()), // 데칼 사진
  firstImage: z.string(), // 데칼 대문 사진(의미는 없음)

  first_uploaded: z.string().datetime(),
  last_edited: z.optional(z.string().datetime()),

  car: carSimpleSchemaType, // 차 정보 간단버전
  tags: z.array(tagItemReadOnly), // 데칼 태그
});
export type DecalSchemaReadType = z.infer<typeof decalSchemaReadType>;

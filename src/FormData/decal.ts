import { z } from 'zod';

import { carSimpleSchemaType } from '@/FormData/car';

import { documentBase } from './base';
import { image, tag } from './post';
import { car, sharingCreation, track } from './post/sharingCreation';
import { tagItemReadOnly } from './tag/tag';

export const decalEditSchema = documentBase
  .merge(sharingCreation)
  .merge(image.multipleImages)
  .merge(car.carDependent)
  .merge(z.object({ name: z.optional(z.string()) }));

export const decalSchemaType = decalEditSchema.required({
  id: true,
  car: true,
  gamerTag: true,
  name: true,
  imageURLs: true,
  shareCode: true,
});

export type DecalSchemaType = z.infer<typeof decalSchemaType>;

export type DecalEditSchema = z.infer<typeof decalEditSchema>;

export const decalEditSchemaDefault: DecalEditSchema = {
  shareCode: undefined, // 공유코드
  car: undefined, // 차 (id)
  gamerTag: undefined, // 데칼 제작자

  imageURLs: [], // 데칼 사진
};

export const decalSchemaReadType = z.object({
  id: z.string(), // 데칼 문서 id
  share_code: z.string(), // 공유코드
  gamerTag: z.string(), // 데칼 제작자
  imageURLs: z.array(z.string()), // 데칼 사진

  first_uploaded: z.string().datetime(),
  last_edited: z.optional(z.string().datetime()),

  car: carSimpleSchemaType, // 차 정보 간단버전
  tags: z.array(tagItemReadOnly), // 데칼 태그
});
export type DecalSchemaReadType = z.infer<typeof decalSchemaReadType>;

// "id": self.id_str,
//         "uploadedAt": self.uploaded_at,
//         "lastEdited": self.last_edited,
//         "shareCode": self.share_code,
//         "gamerTag": self.gamer_tag,
//         "uploader": uploader_uid,
//         "baseCar": base_car_id,

export const decalRead = z.object({
  id: z.string(), // 데칼 문서 id
  uploadedAt: z.date(),
  lastEdited: z.date(),
  shareCode: z.string(), // 공유코드
  gamerTag: z.string(), // 데칼 제작자
  uploader: z.string(),
  baseCar: z.string(),
});

export type DecalRead = z.infer<typeof decalRead>;

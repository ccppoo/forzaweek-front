import type { TagWrite } from '@/FormData/tag';

export const tags = [
  'sports',
  'sponsor',
  'red bull',
  'kazusa',
  'rear wing',
  'autosport',
  'purple',
  'neko',
  'blue archive',
  'real',
  'racing',
  'one color',
  'grey',
  'black',
  'yellow',
];

export interface TagSchemaTypeExtended extends TagWrite {
  inputValue?: string;
}

export const TAGS: TagSchemaTypeExtended[] = [
  {
    id: '1',
    kind: 'car',
    name: [
      {
        lang: 'ko',
        value: '슈퍼카',
      },
      {
        lang: 'en',
        value: '슈퍼카',
      },
    ],
    name_en: 'super car',
  },
  {
    id: '2',
    kind: 'car',
    name: [
      {
        lang: 'ko',
        value: '해치백',
      },
      {
        lang: 'en',
        value: 'hatchback',
      },
    ],
    name_en: 'hatchback',
  },
  {
    id: '3',
    kind: 'car',
    name: [
      {
        lang: 'ko',
        value: '세단',
      },
      {
        lang: 'en',
        value: 'sedan',
      },
    ],
    name_en: 'sedan',
  },
  {
    id: '4',
    kind: 'car',
    name: [
      {
        lang: 'ko',
        value: '트럭',
      },
      {
        lang: 'en',
        value: 'truck',
      },
    ],
    name_en: 'truck',
  },
  {
    id: '5',
    kind: 'decal',
    name: [
      {
        lang: 'ko',
        value: '애니메이션',
      },
      {
        lang: 'en',
        value: 'animation',
      },
    ],
    name_en: 'animation',
  },
  {
    id: '6',
    kind: 'decal',
    name: [
      {
        lang: 'ko',
        value: '블루아카이브',
      },
      {
        lang: 'en',
        value: 'blue archive',
      },
    ],
    name_en: 'blue archive',
  },
  {
    id: '7',
    kind: 'decal',
    name: [
      {
        lang: 'ko',
        value: '사이버펑크',
      },
      {
        lang: 'en',
        value: 'cyberpunk',
      },
    ],
    name_en: 'cyberpunk',
  },
  {
    id: '8',
    kind: 'decal',
    name: [
      {
        lang: 'ko',
        value: '경찰',
      },
      {
        lang: 'en',
        value: 'police',
      },
    ],
    name_en: 'police',
  },
];

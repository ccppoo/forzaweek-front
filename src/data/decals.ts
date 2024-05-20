import { decals } from '@/image/decal';

export type DecalData = {
  creater: string;
  club: string | null;
  share_code: string;
  tags: string[];
  images: string[];
  frontImage: string;
  fav: {
    checked: boolean;
    count: number;
  };
};

export const decalsWithImage: DecalData[] = [
  {
    creater: 'MAKEMEPLAYX360',
    club: null,
    share_code: '665102636',
    tags: ['racing', 'real', 'sponsor'],
    images: decals.d665102636,
    frontImage: decals.d665102636[0],
    fav: {
      checked: false,
      count: 23,
    },
  },
  {
    creater: 'Erinng1',
    club: 'DMTX',
    share_code: '106507631',
    tags: ['simple', 'one color', 'clean'],
    images: decals.d106507631,
    frontImage: decals.d106507631[0],
    fav: {
      checked: true,
      count: 112,
    },
  },
  {
    creater: 'Parafus0',
    club: 'FHPT',
    share_code: '315333137',
    tags: ['sponsor', 'grey', 'monster'],
    images: decals.d315333137,
    frontImage: decals.d315333137[3],
    fav: {
      checked: false,
      count: 327,
    },
  },
  {
    creater: 'Adriano0314',
    club: 'ABD$',
    share_code: '140535376',
    tags: ['neko', 'blue archive', 'suga rush', 'anime', 'Kazusa'],
    images: decals.d140535376,
    frontImage: decals.d140535376[0],
    fav: {
      checked: true,
      count: 564,
    },
  },
  {
    creater: 'Pixarlover',
    club: null,
    share_code: '108323899',
    tags: ['black', 'red', 'sponsor', 'racing', 'rear wing', 'autosport'],
    images: decals.d108323899,
    frontImage: decals.d108323899[5],
    fav: {
      checked: false,
      count: 97,
    },
  },
  {
    creater: 'Blackbeard4543',
    club: '# HD',
    share_code: '622513315',
    tags: ['black', 'purple', 'sponsor', 'racing', 'HKS', 'autosport'],
    images: decals.d622513315,
    frontImage: decals.d622513315[0],
    fav: {
      checked: false,
      count: 89,
    },
  },
];

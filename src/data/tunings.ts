type DrivingSystem = 'AWD' | 'FWD' | 'RWD';
type TierType = 'basic';

export type TestReadings = {
  maxspeed: number | null;
  zero100: number;
  tork: number;
  output: number;
  weight: number;
  skid_pad: number;
};

export type Performance = {
  handling: number;
  speed: number;
  acceleration: number;
  launch: number;
  braking: number;
  offroad: number;
};

export type Tuning = {
  creater: {
    id: string;
    club: string | null;
  };
  fav: {
    count: number;
    checked: boolean;
  };
  tags: string[];
  created_at: string;
  share_code: string;
  PI: number;
  test_reading: TestReadings;
  performance: Performance;
  suspension: string;
  tier: string;
  driving_system: DrivingSystem;
};

export const tunings: Tuning[] = [
  {
    creater: {
      id: 'BP1G',
      club: null,
    },
    fav: {
      count: 324,
      checked: false,
    },
    tags: ['speed', 'handling', 'street', 'drift'],
    created_at: '2024-05-19',
    share_code: '481866552',
    PI: 995,
    test_reading: {
      maxspeed: 340.1,
      zero100: 3.525,
      tork: 133,
      output: 1297,
      weight: 1231,
      skid_pad: 1.68,
    },
    performance: {
      handling: 8.1,
      speed: 7.5,
      acceleration: 10,
      launch: 10,
      braking: 10,
      offroad: 4.9,
    },
    suspension: 'drift',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'KAKALEE8776',
      club: 'HKT',
    },

    fav: {
      count: 48,
      checked: false,
    },
    tags: ['speed', 'handling', 'street', 'race'],
    created_at: '2024-05-20',
    share_code: '121408832',
    PI: 998,
    test_reading: {
      maxspeed: 401.1,
      zero100: 3.369,
      output: 1375,
      tork: 141,
      weight: 1259,
      skid_pad: 1.65,
    },
    performance: {
      handling: 7.8,
      speed: 7.3,
      acceleration: 10,
      launch: 10,
      braking: 10,
      offroad: 4.7,
    },
    suspension: 'race',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'Judiddid',
      club: null,
    },

    fav: {
      count: 86,
      checked: true,
    },
    tags: ['speed', 'handling', 'street', 'race'],
    created_at: '2024-05-19',
    share_code: '671275536',
    PI: 900,
    test_reading: {
      maxspeed: 298.5,
      zero100: 5.765,
      output: 655,
      tork: 79,
      weight: 1409,
      skid_pad: 1.64,
    },
    performance: {
      handling: 7.8,
      speed: 6.8,
      acceleration: 10,
      launch: 10,
      braking: 9.9,
      offroad: 5.2,
    },
    suspension: 'race',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'GoofiestOrca704',
      club: null,
    },

    fav: {
      count: 54,
      checked: false,
    },
    tags: ['speed', 'handling', 'street', 'race'],
    created_at: '2024-05-19',
    share_code: '156235850',
    PI: 900,
    test_reading: {
      maxspeed: 297.3,
      zero100: 6.112,
      tork: 76,
      output: 629,
      weight: 1291,
      skid_pad: 1.31,
    },
    performance: {
      handling: 7.5,
      speed: 6.7,
      acceleration: 10,
      launch: 10,
      braking: 9.5,
      offroad: 5.4,
    },
    suspension: 'race',
    tier: 'race',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'X TH14GO BOX',
      club: null,
    },
    fav: {
      count: 22,
      checked: false,
    },
    tags: ['speed', 'handling', 'street', 'race'],
    created_at: '2024-05-20',
    share_code: '100511184',
    PI: 998,
    test_reading: {
      maxspeed: 371.2,
      zero100: 3.473,
      tork: 141,
      output: 1375,
      weight: 1257,
      skid_pad: 1.69,
    },
    performance: {
      handling: 6.8,
      speed: 5.3,
      acceleration: 10,
      launch: 10,
      braking: 10,
      offroad: 4.1,
    },
    suspension: 'race',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'EI T10 N4CH0',
      club: 'XEA',
    },
    fav: {
      count: 19,
      checked: false,
    },
    tags: ['speed', 'handling', 'street', 'race'],
    created_at: '2024-05-19',
    share_code: '164101033',
    PI: 973,
    test_reading: {
      maxspeed: 395.3,
      zero100: 5.782,
      tork: 133,
      output: 1297,
      weight: 1178,
      skid_pad: 1.65,
    },
    performance: {
      handling: 7.9,
      speed: 7.5,
      acceleration: 5.9,
      launch: 6.3,
      braking: 10,
      offroad: 4.4,
    },
    suspension: 'drift',
    tier: 'basic',
    driving_system: 'RWD',
  },
  {
    creater: {
      id: 'IPatchMe2kl',
      club: null,
    },
    fav: {
      count: 54,
      checked: false,
    },
    tags: ['speed', 'handling', 'snow', 'race'],
    created_at: '2024-05-20',
    share_code: '137524163',
    PI: 900,
    test_reading: {
      maxspeed: null,
      zero100: 8.248,
      tork: 126,
      output: 1222,
      weight: 1538,
      skid_pad: 1.03,
    },
    performance: {
      handling: 6.4,
      speed: 7.3,
      acceleration: 8.6,
      launch: 9.6,
      braking: 6.7,
      offroad: 4.8,
    },
    suspension: 'drift',
    tier: 'snow',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'PastelBus273533',
      club: null,
    },
    fav: {
      count: 67,
      checked: false,
    },
    tags: ['speed', 'handling', 'race'],
    created_at: '2024-05-20',
    share_code: '126423005',
    PI: 800,
    test_reading: {
      maxspeed: 234.7,
      zero100: 10.974,
      tork: 46,
      output: 355,
      weight: 1360,
      skid_pad: 1.63,
    },
    performance: {
      handling: 7.2,
      speed: 5.5,
      acceleration: 4.9,
      launch: 2.1,
      braking: 8.4,
      offroad: 5.1,
    },
    suspension: 'race',
    tier: 'basic',
    driving_system: 'FWD',
  },
  {
    creater: {
      id: 'ResurgentSafe55',
      club: null,
    },
    fav: {
      count: 37,
      checked: false,
    },
    tags: ['speed', 'handling', 'race', 'drift', 'basic'],
    created_at: '2024-05-20',
    share_code: '112176330',
    PI: 965,
    test_reading: {
      maxspeed: 383.7,
      zero100: 6.842,
      tork: 141,
      output: 1375,
      weight: 1215,
      skid_pad: 1.68,
    },
    performance: {
      handling: 7.3,
      speed: 7.3,
      acceleration: 5.2,
      launch: 5.5,
      braking: 10,
      offroad: 4.3,
    },
    suspension: 'drift',
    tier: 'basic',
    driving_system: 'FWD',
  },
  {
    creater: {
      id: 'AKT108',
      club: null,
    },
    fav: {
      count: 11,
      checked: false,
    },
    tags: ['handling', 'race', 'corner'],
    created_at: '2024-05-02',
    share_code: '553126139',
    PI: 900,
    test_reading: {
      maxspeed: 295.5,
      zero100: 5.591,
      tork: 66,
      output: 545,
      weight: 1164,
      skid_pad: 1.66,
    },
    performance: {
      handling: 8.0,
      speed: 6.4,
      acceleration: 10,
      launch: 10,
      braking: 10,
      offroad: 5.3,
    },
    suspension: 'race',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'ImaginaryMonsta',
      club: null,
    },

    fav: {
      count: 68,
      checked: false,
    },
    tags: ['speed', 'handling', 'race'],
    created_at: '2024-05-02',
    share_code: '726532255',
    PI: 999,
    test_reading: {
      maxspeed: 415.5,
      zero100: 3.334,
      tork: 141,
      output: 1375,
      weight: 1258,
      skid_pad: 1.63,
    },
    performance: {
      handling: 7.8,
      speed: 7.5,
      acceleration: 10,
      launch: 10,
      braking: 10,
      offroad: 4.8,
    },
    suspension: 'race',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'AKT108',
      club: null,
    },
    fav: {
      count: 108,
      checked: true,
    },
    tags: ['speed', 'handling', 'race', 'basic'],
    created_at: '2024-04-29',
    share_code: '117208233',
    PI: 800,
    test_reading: {
      maxspeed: 269.1,
      zero100: 8.925,
      tork: 53,
      output: 407,
      weight: 1400,
      skid_pad: 1.4,
    },
    performance: {
      handling: 7.1,
      speed: 5.7,
      acceleration: 7.8,
      launch: 9.6,
      braking: 6.6,
      offroad: 6.7,
    },
    suspension: 'race',
    tier: 'rally',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'chaseportera',
      club: '$UB2',
    },
    fav: {
      count: 9,
      checked: false,
    },
    tags: ['speed', 'handling', 'race'],
    created_at: '2024-05-04',
    share_code: '428869928',
    PI: 999,
    test_reading: {
      maxspeed: 416.5,
      zero100: 3.664,
      tork: 141,
      output: 1375,
      weight: 1257,
      skid_pad: 1.62,
    },
    performance: {
      handling: 7.5,
      speed: 7.5,
      acceleration: 10,
      launch: 10,
      braking: 10,
      offroad: 6.5,
    },
    suspension: 'rally',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'Sungho Ahn',
      club: null,
    },
    fav: {
      count: 47,
      checked: false,
    },
    tags: ['speed', 'handling', 'race'],
    created_at: '2024-05-03',
    share_code: '337488958',
    PI: 999,
    test_reading: {
      maxspeed: 414.5,
      zero100: 3.386,
      tork: 141,
      output: 1375,
      weight: 1257,
      skid_pad: 1.62,
    },
    performance: {
      handling: 7.9,
      speed: 7.5,
      acceleration: 10,
      launch: 10,
      braking: 10,
      offroad: 4.8,
    },
    suspension: 'race',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'geistwriter',
      club: null,
    },
    fav: {
      count: 245,
      checked: false,
    },
    tags: ['speed', 'handling', 'race', 'balance'],
    created_at: '2024-05-02',
    share_code: '709570548',
    PI: 998,
    test_reading: {
      maxspeed: 370.6,
      zero100: 3.456,
      tork: 141,
      output: 1375,
      weight: 1261,
      skid_pad: 1.7,
    },
    performance: {
      handling: 7.7,
      speed: 7.3,
      acceleration: 10,
      launch: 10,
      braking: 10,
      offroad: 4.6,
    },
    suspension: 'race',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'K1Z Bard',
      club: '*1%*',
    },
    fav: {
      count: 197,
      checked: true,
    },
    tags: ['speed', 'handling', 'race', 'slippy'],
    created_at: '2024-05-02',
    share_code: '827964506',
    PI: 800,
    test_reading: {
      maxspeed: 239.1,
      zero100: 11.009,
      tork: 46,
      output: 355,
      weight: 1139,
      skid_pad: 1.28,
    },
    performance: {
      handling: 6.7,
      speed: 5.5,
      acceleration: 4.8,
      launch: 4.9,
      braking: 7.3,
      offroad: 6.2,
    },
    suspension: 'race',
    tier: 'rally',
    driving_system: 'FWD',
  },
  {
    creater: {
      id: 'ugrundy',
      club: null,
    },
    fav: {
      count: 66,
      checked: false,
    },
    tags: ['speed', 'handling', 'race'],
    created_at: '2024-05-02',
    share_code: '175167070',
    PI: 998,
    test_reading: {
      maxspeed: 371.3,
      zero100: 3.629,
      tork: 141,
      output: 1375,
      weight: 1259,
      skid_pad: 1.7,
    },
    performance: {
      handling: 7.8,
      speed: 7.3,
      acceleration: 10,
      launch: 10,
      braking: 10,
      offroad: 4.7,
    },
    suspension: 'race',
    tier: 'basic',
    driving_system: 'AWD',
  },
  {
    creater: {
      id: 'Eley9',
      club: null,
    },
    fav: {
      count: 200,
      checked: true,
    },
    tags: ['speed', 'handling', 'race'],
    created_at: '2024-05-02',
    share_code: '161429561',
    PI: 800,
    test_reading: {
      maxspeed: 274.5,
      zero100: 8.891,
      tork: 54,
      output: 417,
      weight: 1433,
      skid_pad: 1.21,
    },
    performance: {
      handling: 7.1,
      speed: 5.8,
      acceleration: 7.5,
      launch: 7.6,
      braking: 6.6,
      offroad: 6.7,
    },
    suspension: 'race',
    tier: 'rally',
    driving_system: 'AWD',
  },
];

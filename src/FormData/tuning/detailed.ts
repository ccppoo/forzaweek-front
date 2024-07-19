import { z } from 'zod';

const TireTuning = z.object({
  tirePressure: z.object({
    front: z.number().min(0).max(100),
    rear: z.number().min(0).max(100),
  }),
});

const GearingTuning = z.object({
  gearing: z.object({
    finalDrive: z.number().min(0).max(10),
    stages: z.array(z.number().min(0).max(10)),
  }),
});

const AlignmentTuning = z.object({
  camber: z.object({
    front: z.number().min(-100).max(100),
    rear: z.number().min(-100).max(100),
  }),
  toe: z.object({
    front: z.number().min(-100).max(100),
    rear: z.number().min(-100).max(100),
  }),
  frontCaster: z.object({
    angle: z.number().min(-100).max(100),
  }),
});

const AntirollBarsTuning = z.object({
  antirollBars: z.object({
    front: z.number().min(0).max(100),
    rear: z.number().min(0).max(100),
  }),
});

const SpringsTuning = z.object({
  springs: z.object({
    front: z.number().min(0).max(9000),
    rear: z.number().min(0).max(9000),
    unit: z.string(),
  }),
  rideHeight: z.object({
    front: z.number().min(0).max(100),
    rear: z.number().min(0).max(100),
    unit: z.string(),
  }),
});

const DampingTuning = z.object({
  reboundStiffness: z.object({
    front: z.number().min(0).max(50),
    rear: z.number().min(0).max(50),
  }),
  bumpStiffness: z.object({
    front: z.number().min(0).max(50),
    rear: z.number().min(0).max(50),
  }),
});

const AeroTuning = z.object({
  downforce: z.object({
    front: z.number().min(0).max(1000),
    rear: z.number().min(0).max(1000),
    unit: z.string(),
  }),
});

const BrakeTuning = z.object({
  breakingForce: z.object({
    balance: z.number().min(0).max(100),
    pressure: z.number().min(0).max(200),
  }),
});

const DiffrentialTuning = z.object({
  rear: z.object({
    acceleration: z.number().min(0).max(100),
    deceleration: z.number().min(0).max(100),
  }),
});

// NOTE: grearing은 ~단 기어에 따라 개수를 조절해야함 (gear -> 9단이 최고?)
export const tuningDetailed = z.object({
  tires: z.optional(TireTuning),
  gearing: z.optional(GearingTuning),
  alignment: z.optional(AlignmentTuning),
  antirollBars: z.optional(AntirollBarsTuning),
  springs: z.optional(SpringsTuning),
  damping: z.optional(DampingTuning),
  aero: z.optional(AeroTuning),
  brake: z.optional(BrakeTuning),
  diffrential: z.optional(DiffrentialTuning),
});

export type TuningDetailedType = z.infer<typeof tuningDetailed>;

// TODO: unit에 따라 기본값 추가하기
// TODO: add default values varying by units(e.g, kg <-> lb, kg/cm <-> lb/in)
export const tuningDetailedDefault: TuningDetailedType = {
  tires: {
    tirePressure: {
      front: 35,
      rear: 35,
    },
  },
  gearing: {
    gearing: {
      finalDrive: 4,
      stages: [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
    },
  },
  alignment: {
    camber: {
      front: 0,
      rear: 0,
    },
    toe: {
      front: 0,
      rear: 0,
    },
    frontCaster: {
      angle: 4,
    },
  },
  antirollBars: {
    antirollBars: {
      front: 33,
      rear: 33,
    },
  },
  springs: {
    springs: {
      front: 1100,
      rear: 1100,
      unit: 'LB/IN',
    },
    rideHeight: {
      front: 5,
      rear: 5,
      unit: 'IN',
    },
  },
  damping: {
    reboundStiffness: {
      front: 10,
      rear: 10,
    },
    bumpStiffness: {
      front: 10,
      rear: 10,
    },
  },
  aero: {
    downforce: {
      front: 333,
      rear: 333,
      unit: 'LB',
    },
  },
  brake: {
    breakingForce: {
      balance: 50,
      pressure: 50,
    },
  },
  diffrential: {
    rear: {
      acceleration: 50,
      deceleration: 50,
    },
  },
};

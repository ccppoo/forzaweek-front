import type { DetailedTuningChoices } from '@/context/DetailedTuningChoiceContext/types';
import type { TuningOption } from '@/types/car';

type tuningActivate = Record<TuningOption, keyof DetailedTuningChoices>;

export const detailedTuningsContextKey: tuningActivate = {
  Tires: 'tires',
  Gearing: 'gearing',
  Alignment: 'alignment',
  'Antiroll Bars': 'antirollBars',
  Springs: 'springs',
  Damping: 'damping',
  Aero: 'aero',
  Brake: 'brake',
  Diffrential: 'diffrential',
};

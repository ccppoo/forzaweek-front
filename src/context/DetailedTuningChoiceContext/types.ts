import type { TuningOptionName } from '@/types/car';

export type DetailedTuningChoices = Record<TuningOptionName | 'nothing', boolean>;

export type DetailedTuningContext = {
  detailedTuningChoices: DetailedTuningChoices;
  setDetailedTuning: (tuningOptionName: TuningOptionName | 'nothing', value: boolean) => void;
};

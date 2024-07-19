import type { DrivingSystemType, PIClass, SuspensionType, TireType } from '@/types';

type PIClassOption = Record<PIClass, boolean>;
type SuspensionOption = Record<SuspensionType, boolean>;
type TireOption = Record<TireType, boolean>;
type DrivingSystemOption = Record<DrivingSystemType, boolean>;

type TuningSearchOptionChoice = PIClassOption | SuspensionOption | TireOption | DrivingSystemOption;

type TuningSearchOption = 'PI' | 'suspension' | 'tire' | 'drivingSystem';
type TuningSearchOptions = {
  PI: PIClassOption;
  suspension: SuspensionOption;
  tire: TireOption;
  drivingSystem: DrivingSystemOption;
};

type Actions = {
  toggleOption: (name: string, option: TuningSearchOption) => void;
  toggleAllSingleOption: (option: TuningSearchOption) => void;
  unselectAllSingleOption: (option: TuningSearchOption) => void;
  selectAllEveryOption: () => void;
};

export type {
  PIClassOption,
  SuspensionOption,
  TireOption,
  DrivingSystemOption,
  TuningSearchOption,
  TuningSearchOptions,
  Actions,
  TuningSearchOptionChoice,
};

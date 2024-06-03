import type { DrivingSystemType, PIClass, SuspensionType, TierType } from '@/types';

type PIClassOption = Record<PIClass, boolean>;
type SuspensionOption = Record<SuspensionType, boolean>;
type TierOption = Record<TierType, boolean>;
type DrivingSystemOption = Record<DrivingSystemType, boolean>;

type TuningSearchOptionChoice = PIClassOption | SuspensionOption | TierOption | DrivingSystemOption;

type TuningSearchOption = 'PI' | 'suspension' | 'tier' | 'drivingSystem';
type TuningSearchOptions = {
  PI: PIClassOption;
  suspension: SuspensionOption;
  tier: TierOption;
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
  TierOption,
  DrivingSystemOption,
  TuningSearchOption,
  TuningSearchOptions,
  Actions,
  TuningSearchOptionChoice,
};

import { createContext } from 'react';

import type { DetailedTuningChoices, DetailedTuningContext } from './types';

export const detailedTuningChoicesDefault: DetailedTuningChoices = {
  tires: false,
  gearing: false,
  alignment: false,
  antirollBars: false,
  springs: false,
  damping: false,
  aero: false,
  brake: false,
  diffrential: false,
  nothing: false,
};

export const DetailedTuningChoiceContext = createContext<DetailedTuningContext>({
  detailedTuningChoices: detailedTuningChoicesDefault,
  setDetailedTuning: (tuningOptionName, value) => {},
});

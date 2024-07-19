import { useContext } from 'react';

import { FormControlLabel, Switch } from '@mui/material';

import DetailedTuningChoiceContext from '@/context/DetailedTuningChoiceContext';
import type { TuningOptionName } from '@/types/car';

export default function DetailedTuningActivateSwitch({
  tuningName,
}: {
  tuningName: TuningOptionName | 'nothing';
}) {
  const { detailedTuningChoices, setDetailedTuning } = useContext(DetailedTuningChoiceContext);

  const optionActivated = detailedTuningChoices[tuningName];
  const handleChange = () => {
    console.log(`fieldName : ${tuningName} : optionActivated : ${optionActivated}`);
    setDetailedTuning(tuningName, !optionActivated);
  };

  return (
    <FormControlLabel
      control={<Switch checked={optionActivated} onClick={handleChange} color="info" />}
      label="I have this option activated"
      sx={{ '& .MuiFormControlLabel-label': { fontWeight: 200 } }}
    />
  );
}

import { useContext, useState } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { FlexBox } from '@/components/styled';
import DetailedTuningChoiceContext from '@/context/DetailedTuningChoiceContext';
import type { TuningOption } from '@/types/car';
import { getFormPath } from '@/utils/FormInput';

import { SliderTitle, SliderValue } from './sliderComponents';

export default function AntirollBarsOption() {
  const tuningIndex: TuningOption = 'Antiroll Bars';
  const formPathBase = ['detailedTuning', 'antirollBars'];

  const { detailedTuningChoices, setDetailedTuning } = useContext(DetailedTuningChoiceContext);

  const optionActivated = detailedTuningChoices.antirollBars;
  const handleChange = () => {
    setDetailedTuning('antirollBars', !optionActivated);
  };
  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <FlexBox sx={{ width: '100%', justifyContent: 'end', alignItems: 'center' }}>
        <FormControlLabel
          // @ts-ignore
          control={<Switch checked={optionActivated} onClick={handleChange} color="info" />}
          label="I have this option activated"
          sx={{ '& .MuiFormControlLabel-label': { fontWeight: 200 } }}
        />
      </FlexBox>
      <FlexBox
        sx={{
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          rowGap: 2,
          opacity: !optionActivated ? 0.4 : 1,
          pointerEvents: !optionActivated ? 'none' : 'auto',
        }}
      >
        <Divider flexItem />
        <SliderTitle name={'Antiroll Bars'} LeftName={'Soft'} RightName={'Stiff'} />
        <SliderValue
          name="Front"
          min={1.0}
          max={65.0}
          step={0.01}
          formPath={getFormPath(formPathBase, ['antirollBars', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={1.0}
          max={65.0}
          step={0.01}
          formPath={getFormPath(formPathBase, ['antirollBars', 'rear'])}
        />
      </FlexBox>
    </TabPanel>
  );
}

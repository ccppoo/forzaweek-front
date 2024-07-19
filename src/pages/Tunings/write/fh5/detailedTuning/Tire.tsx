import { useContext, useState } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Box, Divider, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { FlexBox } from '@/components/styled';
import DetailedTuningChoiceContext from '@/context/DetailedTuningChoiceContext';
import type { TuningOption } from '@/types/car';
import { getFormPath } from '@/utils/FormInput';

import { SliderTitle, SliderValue } from './sliderComponents';
import SliderValueInput from './sliderComponents/SliderValueInput';

export default function TiresOption() {
  const tuningIndex: TuningOption = 'Tires';

  const formPathBase = ['detailedTuning', 'tires'];
  const { detailedTuningChoices, setDetailedTuning } = useContext(DetailedTuningChoiceContext);

  const optionActivated = detailedTuningChoices.tires;
  const handleChange = () => {
    setDetailedTuning('tires', !optionActivated);
  };

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0.5 }}>
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
        <SliderTitle name="Tire Pressure" LeftName={'LOW'} RightName={'HIGH'} unitName={'PSI'} />
        <SliderValueInput
          name="FRONT"
          formPath={getFormPath(formPathBase, ['tirePressure', 'front'])}
          min={15}
          max={55}
          step={0.1}
        />
        <SliderValueInput
          name="REAR"
          formPath={getFormPath(formPathBase, ['tirePressure', 'rear'])}
          min={15}
          max={55}
          step={0.1}
        />
      </FlexBox>
    </TabPanel>
  );
}

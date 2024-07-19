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

// import

export default function AeroOption() {
  const tuningIndex: TuningOption = 'Aero';
  // FIXME: 최소/최대 값이 다름
  const formPathBase = ['detailedTuning', 'aero'];
  const { detailedTuningChoices, setDetailedTuning } = useContext(DetailedTuningChoiceContext);

  const optionActivated = detailedTuningChoices.aero;
  const handleChange = () => {
    setDetailedTuning('aero', !optionActivated);
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
        <SliderTitle name={'Downforce'} LeftName={'Speed'} RightName={'Cornering'} unitName="LB" />
        <SliderValue
          name="Front"
          min={231}
          max={436}
          step={1}
          unitChar="LB"
          formPath={getFormPath(formPathBase, ['downforce', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={216}
          max={421}
          step={1}
          unitChar="LB"
          formPath={getFormPath(formPathBase, ['downforce', 'rear'])}
        />
      </FlexBox>
    </TabPanel>
  );
}

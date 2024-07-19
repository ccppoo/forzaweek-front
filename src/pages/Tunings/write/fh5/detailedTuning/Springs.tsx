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

export default function SpringsOption() {
  const tuningIndex: TuningOption = 'Springs';
  const formPathBase = ['detailedTuning', 'springs'];

  const unitName = 'LB/IN';

  const { detailedTuningChoices, setDetailedTuning } = useContext(DetailedTuningChoiceContext);

  const optionActivated = detailedTuningChoices.springs;
  const handleChange = () => {
    setDetailedTuning('springs', !optionActivated);
  };

  // FIXME: 최소/최대 값이 다름
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
        <SliderTitle name={'Springs'} LeftName={'Soft'} RightName={'Stiff'} unitName="LB/IN" />
        <SliderValue
          name="Front"
          min={345.9}
          max={1729.4}
          step={0.1}
          unitChar="LB/IN"
          formPath={getFormPath(formPathBase, ['springs', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={345.9}
          max={1729.4}
          step={0.1}
          unitChar="LB/IN"
          formPath={getFormPath(formPathBase, ['springs', 'rear'])}
        />
        <SliderTitle name={'Ride Height'} LeftName={'Low'} RightName={'High'} unitName="IN" />
        <SliderValue
          name="Front"
          min={4.6}
          max={5.9}
          step={0.1}
          unitChar="IN"
          formPath={getFormPath(formPathBase, ['rideHeight', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={4.7}
          max={6.0}
          step={0.1}
          unitChar="IN"
          formPath={getFormPath(formPathBase, ['rideHeight', 'rear'])}
        />
      </FlexBox>
    </TabPanel>
  );
}

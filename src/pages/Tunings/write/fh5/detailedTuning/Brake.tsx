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

export default function BrakeOption() {
  const tuningIndex: TuningOption = 'Brake';
  const formPathBase = ['detailedTuning', 'brake'];

  const { detailedTuningChoices, setDetailedTuning } = useContext(DetailedTuningChoiceContext);

  const optionActivated = detailedTuningChoices.brake;
  const handleChange = () => {
    setDetailedTuning('brake', !optionActivated);
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
        <SliderTitle name={'Braking Force'} LeftName={'Front'} RightName={'Rear'} />
        {/* TODO: 역순 */}
        <SliderValue
          name="Balance"
          min={100}
          max={0}
          unitChar="%"
          minMaxReverse
          step={1}
          formPath={getFormPath(formPathBase, ['breakingForce', 'balance'])}
        />

        <SliderTitle name={'Braking Force'} LeftName={'Low'} RightName={'High'} />
        <SliderValue
          name="Pressure"
          min={0}
          max={200}
          unitChar="%"
          step={1}
          formPath={getFormPath(formPathBase, ['breakingForce', 'pressure'])}
        />
      </FlexBox>
    </TabPanel>
  );
}

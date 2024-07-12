import { SyntheticEvent, useState } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { FlexBox } from '@/components/styled';
import type { TuningOption } from '@/types/car';

import { SliderTitle, SliderValue } from './sliderComponents';
import { getFormPath } from './utils';

export default function BrakeOption() {
  const tuningIndex: TuningOption = 'Brake';
  const formPathBase = ['detailedTuning', 'brake'];
  const [notMyOption, setNotMyOption] = useState<boolean>(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setNotMyOption(!event.target.checked);
  };
  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <FlexBox sx={{ width: '100%', justifyContent: 'end', alignItems: 'center' }}>
        <FormControlLabel
          // @ts-ignore
          control={<Switch checked={!notMyOption} onClick={handleChange} color="info" />}
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
          opacity: notMyOption ? 0.4 : 1,
          pointerEvents: notMyOption ? 'none' : 'auto',
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

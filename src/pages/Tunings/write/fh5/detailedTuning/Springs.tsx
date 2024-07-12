import { SyntheticEvent, useState } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { FlexBox } from '@/components/styled';
import type { TuningOption } from '@/types/car';

import { SliderTitle, SliderValue } from './sliderComponents';
import { getFormPath } from './utils';

export default function SpringsOption() {
  const tuningIndex: TuningOption = 'Springs';
  const formPathBase = ['detailedTuning', 'springs'];

  const unitName = 'LB/IN';
  const [notMyOption, setNotMyOption] = useState<boolean>(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setNotMyOption(!event.target.checked);
  };
  // FIXME: 최소/최대 값이 다름
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

import { useState } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Box, Divider, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { FlexBox } from '@/components/styled';
import type { TuningOption } from '@/types/car';

import { SliderTitle, SliderValue } from './sliderComponents';
import { getFormPath } from './utils';

export default function AeroOption() {
  const tuningIndex: TuningOption = 'Aero';
  // FIXME: 최소/최대 값이 다름
  const formPathBase = ['detailedTuning', 'aero'];
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

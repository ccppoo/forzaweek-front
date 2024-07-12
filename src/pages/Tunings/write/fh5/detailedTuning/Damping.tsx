import { SyntheticEvent, useState } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Box, Divider, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { FlexBox } from '@/components/styled';
import type { TuningOption } from '@/types/car';

import { SliderTitle, SliderValue } from './sliderComponents';
import { getFormPath } from './utils';

export default function DampingOption() {
  const tuningIndex: TuningOption = 'Damping';
  const formPathBase = ['detailedTuning', 'damping'];
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
        <SliderTitle name={'Rebound Stiffness'} LeftName={'Soft'} RightName={'Stiff'} />
        <SliderValue
          name="Front"
          min={1.0}
          max={20.0}
          step={0.1}
          formPath={getFormPath(formPathBase, ['reboundStiffness', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={1.0}
          max={20.0}
          step={0.1}
          formPath={getFormPath(formPathBase, ['reboundStiffness', 'rear'])}
        />
        <SliderTitle name={'Bump Stiffness'} LeftName={'Low'} RightName={'High'} />
        <SliderValue
          name="Front"
          min={1.0}
          max={20.0}
          step={0.1}
          formPath={getFormPath(formPathBase, ['bumpStiffness', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={1.0}
          max={20.0}
          step={0.1}
          formPath={getFormPath(formPathBase, ['bumpStiffness', 'rear'])}
        />
      </FlexBox>
    </TabPanel>
  );
}

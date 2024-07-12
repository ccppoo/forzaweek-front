import { SyntheticEvent, useState } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Box, Divider, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { FlexBox } from '@/components/styled';
import type { TuningOption } from '@/types/car';

import { SliderTitle, SliderValue } from './sliderComponents';
import { getFormPath } from './utils';

export default function TiresOption() {
  const tuningIndex: TuningOption = 'Tires';

  const formPathBase = ['detailedTuning', 'tiers'];

  const [notMyOption, setNotMyOption] = useState<boolean>(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setNotMyOption(!event.target.checked);
  };

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0.5 }}>
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
        <SliderTitle name="Tier Pressure" LeftName={'LOW'} RightName={'HIGH'} unitName={'PSI'} />
        <SliderValue
          name="FRONT"
          formPath={getFormPath(formPathBase, ['tierPressure', 'front'])}
          min={15}
          max={55}
          step={0.1}
        />
        <SliderValue
          name="REAR"
          formPath={getFormPath(formPathBase, ['tierPressure', 'rear'])}
          min={15}
          max={55}
          step={0.1}
        />
      </FlexBox>
    </TabPanel>
  );
}

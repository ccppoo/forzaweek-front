import { SyntheticEvent, useState } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { FlexBox } from '@/components/styled';
import type { TuningOption } from '@/types/car';

import { SliderTitle, SliderValue } from './sliderComponents';
import { getFormPath } from './utils';

export default function AlignmentOption() {
  const tuningIndex: TuningOption = 'Alignment';

  const formPathBase = ['detailedTuning', 'alignment'];
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
        <SliderTitle name={'Camber'} LeftName={'Negative'} RightName={'Positive'} />
        <SliderValue
          name="Front"
          min={-5.0}
          max={5.0}
          unitChar="°"
          step={0.1}
          formPath={getFormPath(formPathBase, ['camber', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={-5.0}
          max={5.0}
          unitChar="°"
          step={0.1}
          formPath={getFormPath(formPathBase, ['camber', 'rear'])}
        />
        <SliderTitle name={'Toe'} LeftName={'In'} RightName={'Out'} />
        <SliderValue
          name="Front"
          min={-5.0}
          max={5.0}
          unitChar="°"
          formPath={getFormPath(formPathBase, ['toe', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={-5.0}
          max={5.0}
          unitChar="°"
          formPath={getFormPath(formPathBase, ['toe', 'rear'])}
        />
        <SliderTitle name={'Front Caster'} LeftName={'Low'} RightName={'High'} />
        <SliderValue
          name="Angle"
          min={1.0}
          max={7.0}
          unitChar="°"
          formPath={getFormPath(formPathBase, ['frontCaster', 'angle'])}
        />
      </FlexBox>
    </TabPanel>
  );
}
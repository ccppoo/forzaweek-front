import { useContext } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';

import { DetailedTuningActivateSwitch } from '@/components/FormInputs/Tunings';
import { FlexBox } from '@/components/styled';
import DetailedTuningChoiceContext from '@/context/DetailedTuningChoiceContext';
import type { TuningOption } from '@/types/car';
import { getFormPath } from '@/utils/FormInput';

import { detailedTuningsContextKey } from './detailedTuningContext';
import { SliderTitle, SliderValue } from './sliderComponents';

export default function AntirollBarsOption() {
  const tuningIndex: TuningOption = 'Antiroll Bars';
  const formPathBase = ['detailedTuning', 'antirollBars'];

  const contextFieldName = detailedTuningsContextKey[tuningIndex];

  const {
    detailedTuningChoices: { antirollBars: activated },
  } = useContext(DetailedTuningChoiceContext);
  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <FlexBox sx={{ width: '100%', justifyContent: 'end', alignItems: 'center' }}>
        <DetailedTuningActivateSwitch tuningName={contextFieldName} />
      </FlexBox>
      <FlexBox
        sx={{
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          rowGap: 2,
          opacity: !activated ? 0.4 : 1,
          pointerEvents: !activated ? 'none' : 'auto',
        }}
      >
        <Divider flexItem />
        <SliderTitle name={'Antiroll Bars'} LeftName={'Soft'} RightName={'Stiff'} />
        <SliderValue
          name="Front"
          min={1.0}
          max={65.0}
          step={0.01}
          formPath={getFormPath(formPathBase, ['antirollBars', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={1.0}
          max={65.0}
          step={0.01}
          formPath={getFormPath(formPathBase, ['antirollBars', 'rear'])}
        />
      </FlexBox>
    </TabPanel>
  );
}

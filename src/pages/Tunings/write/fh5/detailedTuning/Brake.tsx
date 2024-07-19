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

export default function BrakeOption() {
  const tuningIndex: TuningOption = 'Brake';
  const formPathBase = ['detailedTuning', 'brake'];
  const contextFieldName = detailedTuningsContextKey[tuningIndex];

  const {
    detailedTuningChoices: { brake: activated },
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
        <SliderTitle name={'Braking Force'} LeftName={'Front'} RightName={'Rear'} />
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

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

export default function DampingOption() {
  const tuningIndex: TuningOption = 'Damping';
  const formPathBase = ['detailedTuning', 'damping'];

  const contextFieldName = detailedTuningsContextKey[tuningIndex];

  const {
    detailedTuningChoices: { damping: activated },
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

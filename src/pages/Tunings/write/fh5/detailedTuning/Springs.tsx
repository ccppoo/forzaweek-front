import { useContext } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';

import { DetailedTuningActivateSwitch } from '@/components/FormInputs/Tunings';
import { FlexBox } from '@/components/styled';
import DetailedTuningChoiceContext from '@/context/DetailedTuningChoiceContext';
import type { TuningOption } from '@/types/car';
import { SpringHeightUnits, SpringUnits } from '@/types/units';
import { getFormPath } from '@/utils/FormInput';

import { detailedTuningsContextKey } from './detailedTuningContext';
import { SliderTitle, SliderValue } from './sliderComponents';

export default function SpringsOption() {
  const tuningIndex: TuningOption = 'Springs';
  const formPathBase = ['detailedTuning', 'springs'];

  const contextFieldName = detailedTuningsContextKey[tuningIndex];

  const {
    detailedTuningChoices: { springs: activated },
  } = useContext(DetailedTuningChoiceContext);
  // FIXME: 최소/최대 값이 다름
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
        <SliderTitle
          name={'Springs'}
          LeftName={'Soft'}
          RightName={'Stiff'}
          unitNames={SpringUnits}
          formPath={getFormPath(formPathBase, ['springs', 'unit'])}
        />
        <SliderValue
          name="Front"
          min={345.9}
          max={1729.4}
          step={0.1}
          formPath={getFormPath(formPathBase, ['springs', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={345.9}
          max={1729.4}
          step={0.1}
          formPath={getFormPath(formPathBase, ['springs', 'rear'])}
        />
        <SliderTitle
          name={'Ride Height'}
          LeftName={'Low'}
          RightName={'High'}
          unitNames={SpringHeightUnits}
          formPath={getFormPath(formPathBase, ['rideHeight', 'unit'])}
        />
        <SliderValue
          name="Front"
          min={4.6}
          max={5.9}
          step={0.1}
          formPath={getFormPath(formPathBase, ['rideHeight', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={4.7}
          max={6.0}
          step={0.1}
          formPath={getFormPath(formPathBase, ['rideHeight', 'rear'])}
        />
      </FlexBox>
    </TabPanel>
  );
}

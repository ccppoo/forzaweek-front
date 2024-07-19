import { useContext } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';

import { DetailedTuningActivateSwitch } from '@/components/FormInputs/Tunings';
import { FlexBox } from '@/components/styled';
import DetailedTuningChoiceContext from '@/context/DetailedTuningChoiceContext';
import type { TuningOption } from '@/types/car';
import { PressureUnits } from '@/types/units';
import { getFormPath } from '@/utils/FormInput';

import { detailedTuningsContextKey } from './detailedTuningContext';
import { SliderTitle } from './sliderComponents';
import SliderValueInput from './sliderComponents/SliderValueInput';

export default function TiresOption() {
  const tuningIndex: TuningOption = 'Tires';

  const formPathBase = ['detailedTuning', 'tires'];
  const contextFieldName = detailedTuningsContextKey[tuningIndex];

  const {
    detailedTuningChoices: { tires: activated },
  } = useContext(DetailedTuningChoiceContext);

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0.5 }}>
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
          name="Tire Pressure"
          LeftName={'LOW'}
          RightName={'HIGH'}
          unitNames={PressureUnits}
          formPath={getFormPath(formPathBase, ['tirePressure', 'unit'])}
        />
        <SliderValueInput
          name="FRONT"
          formPath={getFormPath(formPathBase, ['tirePressure', 'front'])}
          min={15}
          max={55}
          step={0.1}
        />
        <SliderValueInput
          name="REAR"
          formPath={getFormPath(formPathBase, ['tirePressure', 'rear'])}
          min={15}
          max={55}
          step={0.1}
        />
      </FlexBox>
    </TabPanel>
  );
}

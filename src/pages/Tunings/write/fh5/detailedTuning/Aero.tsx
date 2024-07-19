import { useContext } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import { Divider } from '@mui/material';

import { DetailedTuningActivateSwitch } from '@/components/FormInputs/Tunings';
import { FlexBox } from '@/components/styled';
import DetailedTuningChoiceContext from '@/context/DetailedTuningChoiceContext';
import type { TuningOption } from '@/types/car';
import { DownForceUnits } from '@/types/units';
import { getFormPath } from '@/utils/FormInput';

import { detailedTuningsContextKey } from './detailedTuningContext';
import { SliderTitle, SliderValue } from './sliderComponents';

export default function AeroOption() {
  const tuningIndex: TuningOption = 'Aero';
  // FIXME: 최소/최대 값이 다름
  const formPathBase = ['detailedTuning', 'aero'];

  const contextFieldName = detailedTuningsContextKey[tuningIndex];

  const {
    detailedTuningChoices: { aero: activated },
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
        <SliderTitle
          name={'Downforce'}
          LeftName={'Speed'}
          RightName={'Cornering'}
          unitNames={DownForceUnits}
          formPath={getFormPath(formPathBase, ['downforce', 'unit'])}
        />
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

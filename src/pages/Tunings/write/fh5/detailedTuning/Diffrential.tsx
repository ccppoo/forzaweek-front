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

export default function DiffrentialOption() {
  const tuningIndex: TuningOption = 'Diffrential';
  const formPathBase = ['detailedTuning', 'diffrential'];

  const { detailedTuningChoices, setDetailedTuning } = useContext(DetailedTuningChoiceContext);

  const optionActivated = detailedTuningChoices.diffrential;
  const handleChange = () => {
    setDetailedTuning('diffrential', !optionActivated);
  };

  const contextFieldName = detailedTuningsContextKey[tuningIndex];

  const {
    detailedTuningChoices: { diffrential: activated },
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
          opacity: !optionActivated ? 0.4 : 1,
          pointerEvents: !optionActivated ? 'none' : 'auto',
        }}
      >
        <Divider flexItem />
        <SliderTitle name={'Rear'} LeftName={'Low'} RightName={'High'} />
        <SliderValue
          name="Acceleration"
          min={0}
          max={100}
          unitChar="%"
          step={1}
          formPath={getFormPath(formPathBase, ['rear', 'acceleration'])}
        />
        <SliderValue
          name="Deceleration"
          min={0}
          max={100}
          unitChar="%"
          step={1}
          formPath={getFormPath(formPathBase, ['rear', 'deceleration'])}
        />
      </FlexBox>
    </TabPanel>
  );
}

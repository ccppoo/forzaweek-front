import { useContext, useState } from 'react';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import TabPanel from '@mui/lab/TabPanel';
import { Button, Divider } from '@mui/material';

import { DetailedTuningActivateSwitch } from '@/components/FormInputs/Tunings';
import { FlexBox } from '@/components/styled';
import DetailedTuningChoiceContext from '@/context/DetailedTuningChoiceContext';
import type { TuningOption } from '@/types/car';
import { range } from '@/utils';
import { getFormPath } from '@/utils/FormInput';

import { detailedTuningsContextKey } from './detailedTuningContext';
import { SliderTitle, SliderValue } from './sliderComponents';

export default function GearingOption() {
  const tuningIndex: TuningOption = 'Gearing';

  const formPathBase = ['detailedTuning', 'gearing'];

  const GEAR_MIN = 1;
  const GEAR_MAX = 9;

  const sliderHeight = 60;

  // TODO: gearNumber 바꾼거 -> form 제출할 때 받아서 서버로 보낼 때 array에 있는 값 길이 맞추기
  const [gearNumbers, setGearNumbers] = useState<number>(5);

  const reduceGear = () => {
    setGearNumbers((n) => (n > GEAR_MIN ? n - 1 : n));
    window.scrollBy({ top: -sliderHeight, behavior: 'smooth' });
  };
  const addGear = () => {
    setGearNumbers((n) => (n < GEAR_MAX ? n + 1 : n));
    window.scrollBy({ top: sliderHeight, behavior: 'smooth' });
  };
  const ordinal = ['1st', '2nd', '3rd'];

  const contextFieldName = detailedTuningsContextKey[tuningIndex];

  const {
    detailedTuningChoices: { gearing: activated },
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
        <SliderTitle name={tuningIndex} LeftName={'SPEED'} RightName={'ACCELERATION'} />
        <SliderValue
          name="Final Drive"
          min={2.2}
          max={6.1}
          step={0.01}
          formPath={getFormPath(formPathBase, ['gearing', 'finalDrive'])}
        />
        <SliderValue
          name="1st"
          min={0.48}
          max={6.0}
          step={0.01}
          height={sliderHeight}
          formPath={getFormPath(formPathBase, ['gearing', 'stages.0'])}
        />
        {gearNumbers > GEAR_MIN &&
          [...range(2, gearNumbers + 1)].map((gearNum) => (
            <SliderValue
              name={gearNum < 4 ? ordinal[gearNum - 1] : `${gearNum}th`}
              min={0.48}
              max={6.0}
              height={sliderHeight}
              step={0.01}
              formPath={getFormPath(formPathBase, ['gearing', `stages.${gearNum - 1}`])}
              key={`gear-number-${gearNum}`}
            />
          ))}
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', columnGap: 2, paddingY: 2 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<RemoveCircleOutlineOutlinedIcon />}
            onClick={reduceGear}
            disabled={gearNumbers <= GEAR_MIN}
          >
            reduce gear
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={addGear}
            disabled={gearNumbers >= GEAR_MAX}
          >
            add gear
          </Button>
        </FlexBox>
      </FlexBox>
    </TabPanel>
  );
}

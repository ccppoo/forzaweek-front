import { SyntheticEvent, useState } from 'react';
import {
  Controller,
  FormProvider,
  UseFormGetValues,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import type { FieldName, FieldValues } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  List,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import Slider from '@mui/material/Slider';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { tuningDetailed } from '@/FormData/tuning/detailed';
// import type { TuningDetailedType, TuningDetailedPath } from '@/FormData/tuning/detailed';
import { FlexBox } from '@/components/styled';
import { range } from '@/utils';
import { getPrecision } from '@/utils/math';

type TuningOption =
  | 'Tires'
  | 'Gearing'
  | 'Alignment'
  | 'Antiroll Bars'
  | 'Springs'
  | 'Damping'
  | 'Aero'
  | 'Brake'
  | 'Dirffrential';

const TuningOptions: TuningOption[] = [
  'Tires',
  'Gearing',
  'Alignment',
  'Antiroll Bars',
  'Springs',
  'Damping',
  'Aero',
  'Brake',
  'Dirffrential',
];
// interface SliderValueProp<FormType extends FieldValues > {
//   name: string;
//   min: number;
//   max: number;
//   formPath: FieldName<FormType>;
//   step?: number;
//   minMaxReverse?: boolean;
//   unitChar?: string;
// }

interface SliderValueProp {
  name: string;
  min: number;
  max: number;
  formPath: string;
  height?: number;
  step?: number;
  minMaxReverse?: boolean;
  unitChar?: string;
}

interface SliderTitleProp {
  name: string;
  LeftName: string;
  RightName: string;
  unitName?: string;
}

function SliderTitle(props: SliderTitleProp) {
  const { name, LeftName, RightName, unitName } = props;
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        minHeight: 60,
        height: '100%',
        gridTemplateColumns: '5fr 4fr 1fr',
      }}
    >
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          paddingX: 1,
        }}
      >
        <Typography variant="h5">{name}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 2,
        }}
      >
        <Typography>{LeftName}</Typography>
        <Typography>{RightName}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>{unitName && unitName}</Typography>
      </FlexBox>
    </Box>
  );
}

function SliderValue(props: SliderValueProp) {
  const { name, min, max, unitChar, minMaxReverse, step, formPath, height: SliderHeight } = props;

  const { control, watch, getValues } = useFormContext<TuningEditSchema>();

  const sliderMin = min;
  const sliderMax = max;
  const sliderMid = Math.floor((sliderMin + sliderMax) / 2);
  const valueLabelFormatter = (value: number) => (unitChar ? `${value} ${unitChar}` : `${value}`);

  // TODO: type check? - like ... formPath as FieldName<TuningEditSchema>
  // FIXME: type check?
  // @ts-expect-error NOTE: 동적으로 hook-forms field name을 가져오는 방법? 'detailedTunings.tier.presssure.front'
  const defaultValue = getValues(formPath) as number;

  const [sliderValue, setSliderValue] = useState<number>(defaultValue as number);
  const [textValue, setTextValue] = useState<string>(defaultValue?.toString());

  const sliderMarks = [
    { value: sliderMin, label: minMaxReverse ? sliderMax.toString() : sliderMin.toString() },
    { value: sliderMid, label: sliderMid.toString() },
    { value: sliderMax, label: minMaxReverse ? sliderMin.toString() : sliderMax.toString() },
  ];

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    // TODO: limit min, max number
    setSliderValue(newValue as number);
    const sliderVal = minMaxReverse ? min - (newValue as number) : (newValue as number);
    if (step && (step >= 10 || step < 1)) {
      const precision = getPrecision(sliderVal);
      setTextValue(sliderVal.toFixed(precision).toString());
    } else {
      setTextValue(sliderVal.toString());
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        height: SliderHeight || 60,
        gridTemplateColumns: '5fr 4fr 1fr',
      }}
    >
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          paddingX: 1,
        }}
      >
        <Typography variant="h6">{name}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 4,
        }}
      >
        <Slider
          value={typeof sliderValue === 'number' ? sliderValue : 0}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) =>
            minMaxReverse ? valueLabelFormatter(sliderMin - v) : valueLabelFormatter(v)
          }
          aria-labelledby="input-slider"
          step={step ? step : 1}
          max={minMaxReverse ? sliderMin : sliderMax}
          min={minMaxReverse ? sliderMax : sliderMin}
          marks={sliderMarks}
        />
      </FlexBox>
      <FlexBox
        sx={{
          width: 100,
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: 1,
        }}
      >
        <TextField
          id="outlined-controlled"
          size="small"
          autoComplete="off"
          value={textValue}
          sx={{ width: 80 }}
          // fullWidth
          inputProps={{
            sx: {
              textAlign: 'right',
              '&::placeholder': {
                textAlign: 'right',
              },
            },
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const originValue = event.target.value;
            var value = event.target.value;
            console.log(`start value : ${value}`);
            if (typeof value !== 'string') {
              setTextValue('');
            }
            value = value.replaceAll(/\.{2,}/g, '.');
            // 숫자, -, . 제외 제거
            if (!value.match(/^[0-9.-]+$/)) {
              const replaced = value.replace(/[^0-9.-]/g, '');
              setTextValue(replaced);
              value = replaced;
            }

            // value = replaced;
            // 숫자 처리
            try {
              const sliderVal = Number.parseFloat(value);
              // console.log(`sliderVal : ${sliderVal}`);
              if (Number.isFinite(sliderVal)) {
                if (!minMaxReverse) {
                  if (sliderVal < sliderMin) {
                    setSliderValue(sliderMin);
                    value = sliderMin.toString();
                  } else if (sliderVal > sliderMax) {
                    setSliderValue(sliderMax);
                    value = sliderMax.toString();
                  } else {
                    setSliderValue(sliderVal);
                  }
                }
                if (minMaxReverse) {
                  if (sliderVal < sliderMax) {
                    setSliderValue(sliderMax);
                    value = sliderMax.toString();
                  } else if (sliderVal > sliderMin) {
                    setSliderValue(sliderMin);
                    value = sliderMin.toString();
                  } else {
                    setSliderValue(sliderMin - sliderVal);
                  }
                }
              }
              if (Number.isNaN(sliderVal)) {
                // console.log(`sliderVal NaN : ${sliderVal}`);
                setSliderValue(0);
              }
            } catch {
              // console.log(`catch`);
              // 소수점 입력 시작
              if (value.endsWith('.')) {
                const num = Number.parseFloat(value.substring(0, -1));
                setSliderValue(num);
              }
            }
            setTextValue(value);
          }}
        />
        {unitChar && unitChar.length < 2 && (
          <FlexBox sx={{ paddingRight: 0.5 }}>
            <Typography>{unitChar}</Typography>
          </FlexBox>
        )}
      </FlexBox>
    </Box>
  );
}

const getFormPath: (base: string[], depth: string[]) => FieldName<TuningEditSchema> = (
  base: string[],
  depth: string[],
) => base.concat(depth).join('.') as FieldName<TuningEditSchema>;

function TiresOption() {
  const tuningIndex: TuningOption = 'Tires';

  const formPathBase = ['detailedTuning', 'tiers'];

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
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
      </Paper>
    </TabPanel>
  );
}

function GearingOption() {
  const tuningIndex: TuningOption = 'Gearing';

  const formPathBase = ['detailedTuning', 'gearing'];

  const GEAR_MIN = 1;
  const GEAR_MAX = 9;

  const sliderHeight = 60;

  // TODO: gearNumber 바꾼거 -> form 제출할 때 받아서 서버로 보낼 때 array에 있는 값 길이 맞추기
  const [gearNumbers, setGearNumbers] = useState<number>(5);

  const removeGear = () => {
    setGearNumbers((n) => (n > GEAR_MIN ? n - 1 : n));
    window.scrollBy({ top: -sliderHeight, behavior: 'smooth' });
  };
  const addGear = () => {
    setGearNumbers((n) => (n < GEAR_MAX ? n + 1 : n));
    window.scrollBy({ top: sliderHeight, behavior: 'smooth' });
  };
  const ordinal = ['1st', '2nd', '3rd'];

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
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
            onClick={removeGear}
            disabled={gearNumbers <= GEAR_MIN}
          >
            remove gear
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
      </Paper>
    </TabPanel>
  );
}
function AlignmentOption() {
  const tuningIndex: TuningOption = 'Alignment';

  const formPathBase = ['detailedTuning', 'alignment'];

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
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
      </Paper>
    </TabPanel>
  );
}
function AntirollBarsOption() {
  const tuningIndex: TuningOption = 'Antiroll Bars';
  const formPathBase = ['detailedTuning', 'antirollBars'];

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
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
      </Paper>
    </TabPanel>
  );
}
function SpringsOption() {
  const tuningIndex: TuningOption = 'Springs';
  const formPathBase = ['detailedTuning', 'springs'];

  const unitName = 'LB/IN';

  // FIXME: 최소/최대 값이 다름
  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Springs'} LeftName={'Soft'} RightName={'Stiff'} unitName="LB/IN" />
        <SliderValue
          name="Front"
          min={345.9}
          max={1729.4}
          step={0.1}
          unitChar="LB/IN"
          formPath={getFormPath(formPathBase, ['springs', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={345.9}
          max={1729.4}
          step={0.1}
          unitChar="LB/IN"
          formPath={getFormPath(formPathBase, ['springs', 'rear'])}
        />
        <SliderTitle name={'Ride Height'} LeftName={'Low'} RightName={'High'} unitName="IN" />
        <SliderValue
          name="Front"
          min={4.6}
          max={5.9}
          step={0.1}
          unitChar="IN"
          formPath={getFormPath(formPathBase, ['rideHeight', 'front'])}
        />
        <SliderValue
          name="Rear"
          min={4.7}
          max={6.0}
          step={0.1}
          unitChar="IN"
          formPath={getFormPath(formPathBase, ['rideHeight', 'rear'])}
        />
      </Paper>
    </TabPanel>
  );
}
function DampingOption() {
  const tuningIndex: TuningOption = 'Damping';
  const formPathBase = ['detailedTuning', 'damping'];

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
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
      </Paper>
    </TabPanel>
  );
}
function AeroOption() {
  const tuningIndex: TuningOption = 'Aero';
  // FIXME: 최소/최대 값이 다름
  const formPathBase = ['detailedTuning', 'aero'];

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Downforce'} LeftName={'Speed'} RightName={'Cornering'} unitName="LB" />
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
      </Paper>
    </TabPanel>
  );
}
function BrakeOption() {
  const tuningIndex: TuningOption = 'Brake';
  const formPathBase = ['detailedTuning', 'brake'];

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Braking Force'} LeftName={'Front'} RightName={'Rear'} />
        {/* TODO: 역순 */}
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
      </Paper>
    </TabPanel>
  );
}
function DirffrentialOption() {
  const tuningIndex: TuningOption = 'Dirffrential';
  const formPathBase = ['detailedTuning', 'diffrential'];

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
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
      </Paper>
    </TabPanel>
  );
}

export default function DetailedTuningTabs() {
  const [tuningTab, setTuningTab] = useState<TuningOption>('Tires');

  const changeTuningTabIndex = (event: SyntheticEvent, index: TuningOption) => {
    setTuningTab(index);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', typography: 'body1' }}>
      <TabContext value={tuningTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={changeTuningTabIndex} aria-label="tabs">
            {TuningOptions.map((opt, idx) => (
              <Tab label={opt} value={opt} key={`tuning-option-tab-${opt}-${idx}`} />
            ))}
          </TabList>
        </Box>
        <TiresOption />
        <GearingOption />
        <AlignmentOption />
        <AntirollBarsOption />
        <SpringsOption />
        <DampingOption />
        <AeroOption />
        <BrakeOption />
        <DirffrentialOption />
      </TabContext>
    </Box>
  );
}

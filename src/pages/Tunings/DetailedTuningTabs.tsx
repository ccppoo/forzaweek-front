import { SyntheticEvent, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

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
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';

import { FlexBox } from '@/components/styled';
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

interface SliderValueProp {
  name: string;
  min: number;
  max: number;
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
  const { name, min, max, unitChar, minMaxReverse, step } = props;

  const sliderMin = min;
  const sliderMax = max;
  const sliderMid = Math.floor((sliderMin + sliderMax) / 2);

  const [sliderValue, setSliderValue] = useState<number>(sliderMid);
  const [textValue, setTextValue] = useState<string>(sliderValue.toString());

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
          valueLabelDisplay="on"
          valueLabelFormat={(v) => (minMaxReverse ? sliderMin - v : v)}
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
        {unitChar && (
          <FlexBox sx={{ paddingRight: 0.5 }}>
            <Typography>{unitChar}</Typography>
          </FlexBox>
        )}
      </FlexBox>
    </Box>
  );
}

function TiresOption() {
  const tuningIndex: TuningOption = 'Tires';

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name="Tier Pressure" LeftName={'LOW'} RightName={'HIGH'} unitName={'PSI'} />
        <SliderValue name="FRONT" min={15} max={55} step={0.1} />
        <SliderValue name="REAR" min={15} max={55} step={0.1} />
      </Paper>
    </TabPanel>
  );
}
function GearingOption() {
  const tuningIndex: TuningOption = 'Gearing';

  // TODO: 기어 몇 단까지 할지 값 받기
  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={tuningIndex} LeftName={'SPEED'} RightName={'ACCELERATION'} />
        <SliderValue name="Final Drive" min={2.2} max={6.1} step={0.01} />
        <SliderValue name="1st" min={0.48} max={6.0} step={0.01} />
        <SliderValue name="2nd" min={0.48} max={6.0} step={0.01} />
        <SliderValue name="3rd" min={0.48} max={6.0} step={0.01} />
        <SliderValue name="4th" min={0.48} max={6.0} step={0.01} />
        <SliderValue name="5th" min={0.48} max={6.0} step={0.01} />
        <SliderValue name="6th" min={0.48} max={6.0} step={0.01} />
      </Paper>
    </TabPanel>
  );
}
function AlignmentOption() {
  const tuningIndex: TuningOption = 'Alignment';
  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Camber'} LeftName={'Negative'} RightName={'Positive'} />
        <SliderValue name="Front" min={-5.0} max={5.0} unitChar="°" step={0.1} />
        <SliderValue name="Rear" min={-5.0} max={5.0} unitChar="°" step={0.1} />
        <SliderTitle name={'Toe'} LeftName={'In'} RightName={'Out'} />
        <SliderValue name="Front" min={-5.0} max={5.0} unitChar="°" step={0.1} />
        <SliderValue name="Rear" min={-5.0} max={5.0} unitChar="°" step={0.1} />
        <SliderTitle name={'Front Caster'} LeftName={'Low'} RightName={'High'} />
        <SliderValue name="Angle" min={1.0} max={7.0} unitChar="°" step={0.1} />
      </Paper>
    </TabPanel>
  );
}
function AntirollBarsOption() {
  const tuningIndex: TuningOption = 'Antiroll Bars';

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Antiroll Bars'} LeftName={'Soft'} RightName={'Stiff'} />
        <SliderValue name="Front" min={1.0} max={65.0} step={0.01} />
        <SliderValue name="Rear" min={1.0} max={65.0} step={0.01} />
      </Paper>
    </TabPanel>
  );
}
function SpringsOption() {
  const tuningIndex: TuningOption = 'Springs';

  // FIXME: 최소/최대 값이 다름
  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Springs'} LeftName={'Soft'} RightName={'Stiff'} unitName="LB/IN" />
        <SliderValue name="Front" min={345.9} max={1729.4} step={0.1} />
        <SliderValue name="Rear" min={345.9} max={1729.4} step={0.1} />
        <SliderTitle name={'Ride Height'} LeftName={'Low'} RightName={'High'} unitName="IN" />
        <SliderValue name="Front" min={4.6} max={5.9} step={0.1} />
        <SliderValue name="Rear" min={4.7} max={6.0} step={0.1} />
      </Paper>
    </TabPanel>
  );
}
function DampingOption() {
  const tuningIndex: TuningOption = 'Damping';

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Rebound Stiffness'} LeftName={'Soft'} RightName={'Stiff'} />
        <SliderValue name="Front" min={1.0} max={20.0} step={0.1} />
        <SliderValue name="Rear" min={1.0} max={20.0} step={0.1} />
        <SliderTitle name={'Bump Stiffness'} LeftName={'Low'} RightName={'High'} />
        <SliderValue name="Front" min={1.0} max={20.0} step={0.1} />
        <SliderValue name="Rear" min={1.0} max={20.0} step={0.1} />
      </Paper>
    </TabPanel>
  );
}
function AeroOption() {
  const tuningIndex: TuningOption = 'Aero';
  // FIXME: 최소/최대 값이 다름

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Downforce'} LeftName={'Speed'} RightName={'Cornering'} unitName="LB" />
        <SliderValue name="Front" min={231} max={436} step={1} />
        <SliderValue name="Rear" min={216} max={421} step={1} />
      </Paper>
    </TabPanel>
  );
}
function BrakeOption() {
  const tuningIndex: TuningOption = 'Brake';

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Braking Force'} LeftName={'Front'} RightName={'Rear'} />
        {/* TODO: 역순 */}
        <SliderValue name="Balance" min={100} max={0} unitChar="%" minMaxReverse step={1} />
        <SliderTitle name={'Braking Force'} LeftName={'Low'} RightName={'High'} />
        <SliderValue name="Pressure" min={0} max={200} unitChar="%" step={1} />
      </Paper>
    </TabPanel>
  );
}
function DirffrentialOption() {
  const tuningIndex: TuningOption = 'Dirffrential';

  return (
    <TabPanel value={tuningIndex} sx={{ paddingX: 0 }}>
      <Paper
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', rowGap: 2 }}
      >
        <Divider />
        <SliderTitle name={'Rear'} LeftName={'Low'} RightName={'High'} />
        <SliderValue name="Acceleration" min={0} max={100} unitChar="%" step={1} />
        <SliderValue name="Deceleration" min={0} max={100} unitChar="%" step={1} />
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

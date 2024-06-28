import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';
import type { FieldName, FieldValues } from 'react-hook-form';

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
import { ButtonBase } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { PI_Card } from '@/components/PI';
import { FlexBox } from '@/components/styled';
import type { PIClass } from '@/types';
import { get_pi_class, get_pi_color, get_pi_color_by_class } from '@/utils/car';
import { getPrecision } from '@/utils/math';

import { chartOptions } from './charOption';

interface SliderValueProp {
  name: string;
  min: number;
  max: number;
  mid?: number;
  formPath: string;
  step?: number;
  minMaxReverse?: boolean;
  unitChar?: string;
}

const getFormPath: (base: string[], depth: string[]) => FieldName<TuningEditSchema> = (
  base: string[],
  depth: string[],
) => base.concat(depth).join('.') as FieldName<TuningEditSchema>;

function SliderValue(props: SliderValueProp) {
  const { name, min, max, mid, unitChar, minMaxReverse, step, formPath } = props;

  const { getValues, setValue } = useFormContext<TuningEditSchema>();

  const sliderMin = min;
  const sliderMax = max;
  const sliderMid = mid ? mid : Math.floor((sliderMin + sliderMax) / 2);
  const valueLabelFormatter = (value: number) => (unitChar ? `${value} ${unitChar}` : `${value}`);

  // TODO: type check? - like ... formPath as FieldName<TuningEditSchema>
  // FIXME: type check?
  // @ts-expect-error NOTE: 동적으로 hook-forms field name을 가져오는 방법? 'detailedTunings.tier.presssure.front'
  const defaultValue = getValues(formPath) as number;

  const [sliderValue, setSliderValue] = useState<number>(defaultValue as number);
  const [textValue, setTextValue] = useState<string>(defaultValue?.toString());

  const sliderMarks = [
    { value: sliderMin, label: sliderMin.toString() },
    { value: 100, label: '100' },
    { value: 500, label: '500' },
    { value: 501, label: '501' },
    { value: 601, label: '600' },
    { value: 600, label: '600' },
    { value: 700, label: '700' },
    { value: 701, label: '700' },
    { value: 800, label: '800' },
    { value: 801, label: '800' },
    { value: 900, label: '900' },
    { value: 901, label: '900' },
    { value: 998, label: '998' },
    { value: 999, label: '999' },
  ];

  type PI_Class = { class: PIClass; min: number; max: number };

  const PI_class: PI_Class[] = [
    {
      class: 'D',
      min: 100,
      max: 500,
    },
    {
      class: 'C',
      min: 501,
      max: 600,
    },
    {
      class: 'B',
      min: 601,
      max: 700,
    },
    {
      class: 'A',
      min: 701,
      max: 800,
    },
    {
      class: 'S1',
      min: 801,
      max: 900,
    },
    {
      class: 'S2',
      min: 901,
      max: 998,
    },
    {
      class: 'X',
      min: 999,
      max: 999,
    },
  ];

  const [classSelected, setClassSelected] = useState<PI_Class>(PI_class[3]);

  const isClassSelected = (pc: PI_Class) => {
    return classSelected.class == pc.class;
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    // TODO: limit min, max number
    const newvalue = newValue as number;
    setSliderValue(newvalue);
    // @ts-expect-error NOTE: 동적으로 hook-forms field name을 가져오는 방법? 'detailedTunings.tier.presssure.front'
    setValue(formPath, newvalue);
    const sliderVal = minMaxReverse ? min - (newValue as number) : (newValue as number);
    if (step && (step >= 10 || step < 1)) {
      const precision = getPrecision(sliderVal);
      setTextValue(sliderVal.toFixed(precision).toString());
    } else {
      setTextValue(sliderVal.toString());
    }
  };

  return (
    <FlexBox
      sx={{
        width: '100%',
        minHeight: 60,
        height: '100%',
        paddingX: 1,
        paddingY: 1,
        flexDirection: 'column',
      }}
    >
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          paddingX: 2,
          columnGap: 0.5,
        }}
      >
        {PI_class.map((piClass, idx) => {
          return (
            <FlexBox
              sx={{
                width: 50,
                height: 25,
                backgroundColor: get_pi_color_by_class(piClass.class as PIClass),
                opacity: isClassSelected(piClass) ? 1 : 0.6,
                border: isClassSelected(piClass) ? 4 : undefined,
              }}
              component={ButtonBase}
              onClick={() => setClassSelected(piClass)}
            >
              {piClass.class}
            </FlexBox>
          );
        })}
      </FlexBox>
      <FlexBox sx={{ height: '100%' }}>
        <FlexBox
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingX: 2,
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
            max={classSelected.max}
            min={classSelected.min}
            marks={sliderMarks}
          />
        </FlexBox>
        <FlexBox
          sx={{
            width: '100%',
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
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningPIInput() {
  type PerformanceTrait = 'acceleration' | 'speed' | 'braking' | 'offroad' | 'launch' | 'handling';
  const performanceTraits: PerformanceTrait[] = [
    'acceleration',
    'speed',
    'braking',
    'offroad',
    'launch',
    'handling',
  ];

  const { control, watch, getValues } = useFormContext<TuningEditSchema>();
  const formPathBase = ['performance'];

  const performanceValue = performanceTraits.map(
    (perfName) => watch('performance')[perfName],
  ) as number[];

  // TODO: more graceful way?
  const series = [
    {
      name: 'performance',
      data: [...performanceValue],
    },
  ];

  const PI_MAX = 999;
  const PI_MIN = 100;
  const PI_STEP = 1;

  const NAME = 'PI';
  const formPathValue = 'pi';

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingBottom: 2, height: '100%' }}>
      <FlexBox sx={{ width: '100%', minWidth: 500, height: '100%' }} component={Paper}>
        <FlexBox sx={{ width: '100%' }}>
          <SliderValue
            min={PI_MIN}
            max={PI_MAX}
            step={PI_STEP}
            name={NAME}
            formPath={formPathValue}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default function TuningPI() {
  return (
    <FlexBox
      sx={{ width: '100%', height: '100%', minHeight: 125, flexDirection: 'column', rowGap: 2 }}
    >
      <TuningPIInput />
    </FlexBox>
  );
}

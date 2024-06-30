import { FocusEvent, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { FieldName, FieldValues } from 'react-hook-form';

import { Button, Paper, Typography } from '@mui/material';
import { ButtonBase } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';
import type { PIClass } from '@/types';
import { get_pi_class, get_pi_color, get_pi_color_by_class } from '@/utils/car';
import { getPrecision } from '@/utils/math';

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

function SliderValue(props: SliderValueProp) {
  const { name, min, max, mid, unitChar, minMaxReverse, step, formPath } = props;

  const { getValues, setValue } = useFormContext<TuningEditSchema>();

  const sliderMin = min;
  const sliderMax = max;
  // const sliderMid = mid ? mid : Math.floor((sliderMin + sliderMax) / 2);
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

  const changePIClass = (piClass: PI_Class) => {
    setClassSelected(piClass);
    setSliderValue(piClass.max);
    setTextValue(piClass.max.toString());
  };

  const isClassSelected = (pc: PI_Class) => {
    return classSelected.class == pc.class;
  };

  const PI_CLASS_COLOR = get_pi_color_by_class(classSelected.class);

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

  const PI_CARD_INPUT_HEIGHT = 50;
  const isPIValueMax = sliderValue == classSelected.max;
  const isPIValueMin = sliderValue == classSelected.min;

  const PI_value_change = (value: number) => {
    setSliderValue((val) => {
      setTextValue((val + value).toString());
      return val + value;
    });
  };

  const setSliderTextfieldValue = (value: number) => {
    // console.log(`value : ${value}`);
    if (value < classSelected.min || value > classSelected.max) {
      const piclass = PI_class.filter(({ min, max }) => value >= min && value <= max)[0];
      // console.log(`piclass : ${JSON.stringify(piclass)}`);
      setClassSelected(piclass);
    }
    setSliderValue(value), setTextValue(value.toString());
  };

  return (
    <FlexBox
      sx={{
        width: '100%',
        minHeight: 60,
        height: '100%',
        paddingX: 1,
        paddingY: 1,
        flexDirection: 'row',
      }}
    >
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'end',
            alignItems: 'center',
            paddingX: 2,
            columnGap: 0.5,
          }}
        >
          {PI_class.map((piClass, idx) => {
            return (
              <FlexBox
                sx={{
                  width: 60,
                  height: 25,
                  backgroundColor: get_pi_color_by_class(piClass.class as PIClass),
                  opacity: isClassSelected(piClass) ? 1 : 0.6,
                  border: isClassSelected(piClass) ? 4 : undefined,
                }}
                component={ButtonBase}
                onClick={() => changePIClass(piClass)}
                key={`pi-class-click-box--${piClass.class}`}
              >
                {piClass.class}
              </FlexBox>
            );
          })}
        </FlexBox>
        <FlexBox
          sx={{
            width: '100%',
            alignItems: 'end',
            justifyContent: 'center',
            paddingX: 3,
          }}
        >
          {classSelected.class != 'X' ? (
            <Slider
              value={typeof sliderValue === 'number' ? sliderValue : 0}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) =>
                minMaxReverse ? valueLabelFormatter(sliderMin - v) : valueLabelFormatter(v)
              }
              sx={{
                color: PI_CLASS_COLOR,
              }}
              aria-labelledby="input-slider"
              step={step ? step : 1}
              max={classSelected.max}
              min={classSelected.min}
              marks={sliderMarks}
            />
          ) : (
            <FlexBox
              sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 50 }}
            >
              <Typography>999</Typography>
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
      <FlexBox sx={{ justifyContent: 'center', width: '100%' }}>
        {/* PI Card UI Input */}
        <FlexBox
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* class char */}
          <FlexBox
            sx={{
              backgroundColor: PI_CLASS_COLOR,
              minWidth: 25,
              height: PI_CARD_INPUT_HEIGHT,
              aspectRatio: '1/1',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          >
            <Typography fontWeight="fontWeightMedium" color="white">
              {classSelected.class}
            </Typography>
          </FlexBox>
          <FlexBox
            sx={{
              border: `2px ${PI_CLASS_COLOR} solid`,
              backgroundColor: 'white',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              minWidth: 50,
              width: PI_CARD_INPUT_HEIGHT * 1.5,
              height: PI_CARD_INPUT_HEIGHT,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              id="outlined-controlled"
              size="small"
              autoComplete="off"
              value={textValue}
              sx={{ width: 80, '& fieldset': { border: 'none' } }}
              // fullWidth
              inputProps={{
                sx: {
                  textAlign: 'center',
                  '&::placeholder': {
                    textAlign: 'center',
                  },
                },
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const originValue = event.target.value;
                var value = event.target.value;
                // console.log(`start value : ${value}`);
                if (typeof value !== 'string') {
                  setTextValue('');
                }
                // 숫자 외 제거
                if (!value.match(/^[0-9]+$/)) {
                  const replaced = value.replace(/[^0-9]/g, '');
                  setTextValue(replaced);
                  value = replaced;
                }

                // value = replaced;
                // 숫자 처리
                try {
                  const sliderVal = Number.parseFloat(value);

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
              onBlur={(e: FocusEvent<HTMLInputElement>) => {
                e.stopPropagation();
                e.preventDefault();
                // 입력 다 마치고 슬라이더 값 업데이트
                const completedInput = Number.parseInt(textValue);
                if (!Number.isFinite(completedInput)) {
                  // 이상한 경우 기본값으로
                  setSliderTextfieldValue(800);
                }

                if (completedInput < sliderMin) {
                  setSliderTextfieldValue(sliderMin);
                } else if (completedInput > sliderMax) {
                  setSliderTextfieldValue(sliderMax);
                } else {
                  setSliderTextfieldValue(completedInput);
                }
                // console.log(`on blur`);
              }}
            />
          </FlexBox>
          {/* PI -1, +1 버튼 */}
          <FlexBox sx={{ columnGap: 1, paddingX: 2 }}>
            <Button
              variant="outlined"
              disabled={isPIValueMin}
              color="error"
              onClick={() => PI_value_change(-1)}
            >
              <Typography fontWeight={800}>- 1</Typography>
            </Button>
            <Button variant="outlined" disabled={isPIValueMax} onClick={() => PI_value_change(1)}>
              <Typography fontWeight={800}>+ 1</Typography>
            </Button>
          </FlexBox>
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

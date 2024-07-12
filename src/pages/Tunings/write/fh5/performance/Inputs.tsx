import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useFormContext } from 'react-hook-form';
import type { FieldName } from 'react-hook-form';

import { Box, Paper, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';
import type { PerformanceTrait } from '@/types/car';
import { getPrecision } from '@/utils/math';

import { chartOptions } from './chartOption';

interface SliderValueProp {
  name: string;
  min: number;
  max: number;
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
  const { name, min, max, unitChar, minMaxReverse, step, formPath } = props;

  const { getValues, setValue } = useFormContext<TuningEditSchema>();

  // @ts-expect-error NOTE: 동적으로 hook-forms field name을 가져오는 방법? 'detailedTunings.tier.presssure.front'
  const setFormValue = (newValue: number) => setValue(formPath, newValue);

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

  const handleTextInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const originValue = event.target.value;
    var value = event.target.value;
    // console.log(`start value : ${value}`);
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
            setFormValue(sliderMin);
            value = sliderMin.toString();
          } else if (sliderVal > sliderMax) {
            setSliderValue(sliderMax);
            setFormValue(sliderMax);
            value = sliderMax.toString();
          } else {
            setSliderValue(sliderVal);
            setFormValue(sliderVal);
          }
        }
        if (minMaxReverse) {
          if (sliderVal < sliderMax) {
            setSliderValue(sliderMax);
            setFormValue(sliderMax);

            value = sliderMax.toString();
          } else if (sliderVal > sliderMin) {
            setSliderValue(sliderMin);
            setFormValue(sliderMin);
            value = sliderMin.toString();
          } else {
            setSliderValue(sliderMin - sliderVal);
            setFormValue(sliderMin - sliderVal);
          }
        }
      }
      if (Number.isNaN(sliderVal)) {
        // console.log(`sliderVal NaN : ${sliderVal}`);
        setSliderValue(0);
        setFormValue(0);
      }
    } catch {
      // console.log(`catch`);
      // 소수점 입력 시작
      if (value.endsWith('.')) {
        const num = Number.parseFloat(value.substring(0, -1));
        setSliderValue(num);
        setFormValue(num);
      }
    }
    setTextValue(value);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        minHeight: 60,
        height: '100%',
        gridTemplateColumns: '125px 1fr 50px',
        paddingRight: 1,
      }}
    >
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          paddingX: 1,
        }}
      >
        <Typography variant="h6" fontSize={18}>
          {name}
        </Typography>
      </FlexBox>
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
          max={minMaxReverse ? sliderMin : sliderMax}
          min={minMaxReverse ? sliderMax : sliderMin}
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
          inputProps={{
            sx: {
              textAlign: 'right',
              '&::placeholder': {
                textAlign: 'right',
              },
            },
          }}
          onChange={handleTextInputValueChange}
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

export default function PerformaceChartInput() {
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

  const PERFORMANCE_MAX = 10;
  const PERFORMANCE_MIN = 0;
  const PERFORMANCE_STEP = 0.1;

  const RADAR_CHART_WIDTH = 500;
  const RADAR_CHART_HEIGHT = 450;

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingBottom: 2, height: '100%' }}>
      <FlexBox>
        <Typography variant="h5">Performance</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%', minWidth: 500, height: '100%' }} component={Paper}>
        <FlexBox sx={{ width: '100%' }}>
          <ReactApexChart
            series={series}
            options={chartOptions}
            width={RADAR_CHART_WIDTH}
            height={RADAR_CHART_HEIGHT}
            type="radar"
            id={`tuning-detail-radar-chart-${1}`}
          />
          <FlexBox
            sx={{
              flexDirection: 'column',
              width: '100%',
              rowGap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {performanceTraits.map((trait, idx) => {
              return (
                <SliderValue
                  min={PERFORMANCE_MIN}
                  max={PERFORMANCE_MAX}
                  step={PERFORMANCE_STEP}
                  name={trait}
                  formPath={getFormPath(formPathBase, [trait])}
                  key={`tuning-performance-input-slide-${trait}`}
                />
              );
            })}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

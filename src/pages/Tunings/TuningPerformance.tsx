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
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';
import { getPrecision } from '@/utils/math';

import { chartOptions } from './charOption';

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

function PerformaceChartInput() {
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

function TestReadingMaxSpeed() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathUnit = `testReadings.maxspeed.unit`;
  const formPathValue = `testReadings.maxspeed.value`;
  const unitChoiceWidth = 100;
  const Name = 'Max Speed';
  const units = ['km/h', 'mph'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        <FlexBox
          sx={{
            height: '100%',
            justifyContent: 'end',
            alignItems: 'center',
            flex: 5,
            columnGap: 1,
          }}
        >
          {/* TODO: 입력 숫자 제한(소수점 허용) */}
          <TextField
            id="outlined-controlled"
            size="small"
            autoComplete="off"
            defaultValue={getValues(formPathValue) || ''}
            sx={{ width: 80 }}
            inputProps={{
              sx: {
                textAlign: 'right',
                '&::placeholder': {
                  textAlign: 'right',
                },
              },
            }}
          />
        </FlexBox>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5, columnGap: 1 }}>
          <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
            <TextField
              select
              defaultValue={getValues(formPathUnit) || ''}
              inputProps={control.register(formPathUnit, {
                required: 'Please select manufacturer',
              })}
              error={!!formState.errors.testReadings?.maxspeed?.unit}
              helperText={!!formState.errors.testReadings?.maxspeed?.message}
              SelectProps={{
                MenuProps: { sx: { maxHeight: 250, padding: 0 } },
                sx: {
                  '& .MuiSelect-select': {
                    paddingX: 0,
                    paddingY: 0.5,
                  },
                },
              }}
              sx={{ padding: 0 }}
              size="small"
            >
              {units.map((tUnit) => (
                <MenuItem key={`test-reading-unit-${Name}-unit-${tUnit}`} value={tUnit}>
                  <FlexBox>
                    <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                      <Typography>{tUnit}</Typography>
                    </FlexBox>
                  </FlexBox>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TestReadingZero100() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathUnit = `testReadings.zero100.unit`;
  const formPathValue = `testReadings.zero100.value`;
  const unitChoiceWidth = 100;
  const Name = '0-100';
  const units = ['km/h', 'mph'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
        <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
          <TextField
            select
            defaultValue={getValues(formPathUnit) || ''}
            inputProps={control.register(formPathUnit, {
              required: 'Please select manufacturer',
            })}
            error={!!formState.errors.testReadings?.maxspeed?.unit}
            helperText={!!formState.errors.testReadings?.maxspeed?.message}
            SelectProps={{
              MenuProps: { sx: { maxHeight: 250, padding: 0 } },
              sx: {
                '& .MuiSelect-select': {
                  paddingX: 0,
                  paddingY: 0.5,
                },
              },
            }}
            sx={{ padding: 0 }}
            fullWidth
            size="small"
          >
            {units.map((tUnit) => (
              <MenuItem key={`test-reading-unit-${Name}-unit-${tUnit}`} value={tUnit}>
                <FlexBox>
                  <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                    <Typography>{tUnit}</Typography>
                  </FlexBox>
                </FlexBox>
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <FlexBox
          sx={{
            height: '100%',
            justifyContent: 'end',
            alignItems: 'center',
            flex: 5,
            columnGap: 1,
          }}
        >
          {/* TODO: 입력 숫자 제한(소수점 허용) */}
          <TextField
            id="outlined-controlled"
            size="small"
            autoComplete="off"
            defaultValue={getValues(formPathValue) || ''}
            sx={{ width: 80 }}
            inputProps={{
              sx: {
                textAlign: 'right',
                '&::placeholder': {
                  textAlign: 'right',
                },
              },
            }}
          />
        </FlexBox>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5, columnGap: 1 }}>
          <Typography>seconds</Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TestReadingOutput() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathUnit = `testReadings.output.unit`;
  const formPathValue = `testReadings.output.value`;
  const unitChoiceWidth = 100;
  const Name = 'Output';
  const units = ['ps', 'hp'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        <FlexBox
          sx={{
            height: '100%',
            justifyContent: 'end',
            alignItems: 'center',
            flex: 5,
            columnGap: 1,
          }}
        >
          {/* TODO: 입력 숫자 제한(소수점 허용) */}
          <TextField
            id="outlined-controlled"
            size="small"
            autoComplete="off"
            defaultValue={getValues(formPathValue) || ''}
            sx={{ width: 80 }}
            inputProps={{
              sx: {
                textAlign: 'right',
                '&::placeholder': {
                  textAlign: 'right',
                },
              },
            }}
          />
        </FlexBox>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5, columnGap: 1 }}>
          <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
            <TextField
              select
              defaultValue={getValues(formPathUnit) || ''}
              inputProps={control.register(formPathUnit, {
                required: 'Please select manufacturer',
              })}
              error={!!formState.errors.testReadings?.maxspeed?.unit}
              helperText={!!formState.errors.testReadings?.maxspeed?.message}
              SelectProps={{
                MenuProps: { sx: { maxHeight: 250, padding: 0 } },
                sx: {
                  '& .MuiSelect-select': {
                    paddingX: 0,
                    paddingY: 0.5,
                  },
                },
              }}
              sx={{ padding: 0 }}
              fullWidth
              size="small"
            >
              {units.map((tUnit) => (
                <MenuItem key={`test-reading-unit-${Name}-unit-${tUnit}`} value={tUnit}>
                  <FlexBox>
                    <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                      <Typography>{tUnit}</Typography>
                    </FlexBox>
                  </FlexBox>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TestReadingTork() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathUnit = `testReadings.tork.unit`;
  const formPathValue = `testReadings.tork.value`;
  const unitChoiceWidth = 100;
  const Name = 'Tork';
  const units = ['kg·m'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        {/* TODO: 입력 숫자 제한(소수점 허용) */}
        <FlexBox sx={{ height: '100%', alignItems: 'center', justifyContent: 'end', flex: 5 }}>
          <TextField
            id="outlined-controlled"
            size="small"
            autoComplete="off"
            defaultValue={getValues(formPathValue) || ''}
            sx={{ width: 80 }}
            inputProps={{
              sx: {
                textAlign: 'right',
                '&::placeholder': {
                  textAlign: 'right',
                },
              },
            }}
          />
        </FlexBox>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5 }}>
          <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
            <TextField
              select
              defaultValue={getValues(formPathUnit) || ''}
              inputProps={control.register(formPathUnit, {
                required: 'Please select manufacturer',
              })}
              error={!!formState.errors.testReadings?.maxspeed?.unit}
              helperText={!!formState.errors.testReadings?.maxspeed?.message}
              SelectProps={{
                MenuProps: { sx: { maxHeight: 250, padding: 0 } },
                sx: {
                  '& .MuiSelect-select': {
                    paddingX: 0,
                    paddingY: 0.5,
                  },
                },
              }}
              sx={{ padding: 0 }}
              fullWidth
              size="small"
            >
              {units.map((tUnit) => (
                <MenuItem key={`test-reading-unit-${Name}-unit-${tUnit}`} value={tUnit}>
                  <FlexBox>
                    <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                      <Typography>{tUnit}</Typography>
                    </FlexBox>
                  </FlexBox>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TestReadingWeight() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathUnit = `testReadings.weight.unit`;
  const formPathValue = `testReadings.weight.value`;
  const unitChoiceWidth = 100;
  const Name = 'Weight';
  const units = ['kg', 'lb'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        {/* TODO: 입력 숫자 제한(소수점 허용) */}
        <FlexBox sx={{ height: '100%', alignItems: 'center', justifyContent: 'end', flex: 5 }}>
          <TextField
            id="outlined-controlled"
            size="small"
            autoComplete="off"
            defaultValue={getValues(formPathValue) || ''}
            sx={{ width: 80 }}
            inputProps={{
              sx: {
                textAlign: 'right',
                '&::placeholder': {
                  textAlign: 'right',
                },
              },
            }}
          />
        </FlexBox>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5 }}>
          <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
            <TextField
              select
              defaultValue={getValues(formPathUnit) || ''}
              inputProps={control.register(formPathUnit, {
                required: 'Please select manufacturer',
              })}
              error={!!formState.errors.testReadings?.maxspeed?.unit}
              helperText={!!formState.errors.testReadings?.maxspeed?.message}
              SelectProps={{
                MenuProps: { sx: { maxHeight: 250, padding: 0 } },
                sx: {
                  '& .MuiSelect-select': {
                    paddingX: 0,
                    paddingY: 0.5,
                  },
                },
              }}
              sx={{ padding: 0 }}
              fullWidth
              size="small"
            >
              {units.map((tUnit) => (
                <MenuItem key={`test-reading-unit-${Name}-unit-${tUnit}`} value={tUnit}>
                  <FlexBox>
                    <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                      <Typography>{tUnit}</Typography>
                    </FlexBox>
                  </FlexBox>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TestReadingSkidPad() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathUnit = `testReadings.skid_pad.unit`;
  const formPathValue = `testReadings.skid_pad.value`;
  const unitChoiceWidth = 100;
  const Name = 'Skid pad';
  const units = ['Gs'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        {/* TODO: 입력 숫자 제한(소수점 허용) */}
        <FlexBox sx={{ height: '100%', alignItems: 'center', justifyContent: 'end', flex: 5 }}>
          <TextField
            id="outlined-controlled"
            size="small"
            autoComplete="off"
            defaultValue={getValues(formPathValue) || ''}
            sx={{ width: 80 }}
            inputProps={{
              sx: {
                textAlign: 'right',
                '&::placeholder': {
                  textAlign: 'right',
                },
              },
            }}
          />
        </FlexBox>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5 }}>
          {units.length > 1 ? (
            <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
              <TextField
                select
                defaultValue={getValues(formPathUnit) || ''}
                inputProps={control.register(formPathUnit, {
                  required: 'Please select manufacturer',
                })}
                error={!!formState.errors.testReadings?.maxspeed?.unit}
                helperText={!!formState.errors.testReadings?.maxspeed?.message}
                SelectProps={{
                  MenuProps: { sx: { maxHeight: 250, padding: 0 } },
                  sx: {
                    '& .MuiSelect-select': {
                      paddingX: 0,
                      paddingY: 0.5,
                    },
                  },
                }}
                sx={{ padding: 0 }}
                fullWidth
                size="small"
              >
                {units.map((tUnit) => (
                  <MenuItem key={`test-reading-unit-${Name}-unit-${tUnit}`} value={tUnit}>
                    <FlexBox>
                      <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                        <Typography>{tUnit}</Typography>
                      </FlexBox>
                    </FlexBox>
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          ) : (
            <Typography>{units[0]}</Typography>
          )}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TestReadingInput() {
  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
      <FlexBox>
        <Typography variant="h5">Test Readings</Typography>
      </FlexBox>
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'repeat(3, 80px)',
          rowGap: 1,
          columnGap: 10,
          paddingX: 1,
        }}
        component={Paper}
      >
        <TestReadingMaxSpeed />
        <TestReadingZero100 />
        <TestReadingOutput />
        <TestReadingTork />
        <TestReadingWeight />
        <TestReadingSkidPad />
      </Box>
    </FlexBox>
  );
}

function TuningMajorPartsTier() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathValue = `tuningMajorParts.tier`;
  const unitChoiceWidth = 150;
  const Name = 'Tier';
  const choies = ['normal', 'drift', 'rally', 'offroad', 'drag'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 4, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 6, columnGap: 1 }}>
          <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
            <TextField
              select
              defaultValue={getValues(formPathValue) || ''}
              inputProps={control.register(formPathValue, {
                required: 'Please select manufacturer',
              })}
              fullWidth
              error={!!formState.errors.testReadings?.maxspeed?.unit}
              helperText={!!formState.errors.testReadings?.maxspeed?.message}
              SelectProps={{
                MenuProps: { sx: { maxHeight: 350, padding: 0 } },
              }}
              sx={{ padding: 0 }}
              size="small"
            >
              {choies.map((choice) => (
                <MenuItem key={`major-parts-${Name}-${choice}`} value={choice}>
                  <FlexBox>
                    <FlexBox sx={{ alignItems: 'center', paddingX: 2, paddingY: 1 }}>
                      <Typography>{choice}</Typography>
                    </FlexBox>
                  </FlexBox>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningMajorPartsSuspension() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathValue = `tuningMajorParts.suspension`;
  const unitChoiceWidth = 150;
  const Name = 'Suspension';
  const choies = ['normal', 'drift', 'rally', 'offroad', 'speed'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 4, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 6, columnGap: 1 }}>
          <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
            <TextField
              select
              defaultValue={getValues(formPathValue) || ''}
              inputProps={control.register(formPathValue, {
                required: 'Please select manufacturer',
              })}
              fullWidth
              error={!!formState.errors.testReadings?.maxspeed?.unit}
              helperText={!!formState.errors.testReadings?.maxspeed?.message}
              SelectProps={{
                MenuProps: { sx: { maxHeight: 350, padding: 0 } },
              }}
              sx={{ padding: 0 }}
              size="small"
            >
              {choies.map((choice) => (
                <MenuItem key={`major-parts-${Name}-${choice}`} value={choice}>
                  <FlexBox>
                    <FlexBox sx={{ alignItems: 'center', paddingX: 2, paddingY: 1 }}>
                      <Typography>{choice}</Typography>
                    </FlexBox>
                  </FlexBox>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningMajorPartsDrivingSystem() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathValue = `tuningMajorParts.drivingSystem`;
  const unitChoiceWidth = 150;
  const Name = 'Driving System';
  const choies = ['AWD', 'RWD', 'FWD'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5, columnGap: 1 }}>
          <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
            <TextField
              select
              defaultValue={getValues(formPathValue) || ''}
              inputProps={control.register(formPathValue, {
                required: 'Please select manufacturer',
              })}
              fullWidth
              error={!!formState.errors.testReadings?.maxspeed?.unit}
              helperText={!!formState.errors.testReadings?.maxspeed?.message}
              SelectProps={{
                MenuProps: { sx: { maxHeight: 350, padding: 0 } },
              }}
              sx={{ padding: 0 }}
              size="small"
            >
              {choies.map((choice) => (
                <MenuItem key={`major-parts-${Name}-${choice}`} value={choice}>
                  <FlexBox>
                    <FlexBox sx={{ alignItems: 'center', paddingX: 2, paddingY: 1 }}>
                      <Typography>{choice}</Typography>
                    </FlexBox>
                  </FlexBox>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningMajorParts() {
  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
      <FlexBox>
        <Typography variant="h5">Major Parts</Typography>
      </FlexBox>
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '120px',
          columnGap: 5,
          paddingX: 1,
        }}
        component={Paper}
      >
        <TuningMajorPartsTier />
        <TuningMajorPartsSuspension />
        <TuningMajorPartsDrivingSystem />
      </Box>
    </FlexBox>
  );
}

export default function TuningPerformance() {
  return (
    <FlexBox
      sx={{ width: '100%', height: '100%', minHeight: 400, flexDirection: 'column', rowGap: 2 }}
    >
      <PerformaceChartInput />
      <TestReadingInput />
      <TuningMajorParts />
    </FlexBox>
  );
}

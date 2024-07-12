import { SyntheticEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldName } from 'react-hook-form';

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
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';
import type { TuningOption } from '@/types/car';
import { TuningOptions } from '@/types/car';
import { range } from '@/utils';
import { getPrecision } from '@/utils/math';

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

export default function SliderValue(props: SliderValueProp) {
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

  const handleTextInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        height: SliderHeight || 60,
        gridTemplateColumns: '5fr 4fr 80px',
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
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: 1,
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

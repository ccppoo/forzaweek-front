import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import Slider from '@mui/material/Slider';

import type { TuningEditSchema } from '@/FormData/tuning';

interface SliderValueProp {
  min: number;
  max: number;
  formPath: string;
  step?: number;
  minMaxReverse?: boolean;
  unitChar?: string;
}

export default function SliderValue(props: SliderValueProp) {
  type FormDataType = PathValue<TuningEditSchema, FieldPath<TuningEditSchema>>;
  const { min, max, unitChar, minMaxReverse, step, formPath } = props;

  const { setValue, watch } = useFormContext<TuningEditSchema>();

  const formPath_ = formPath as FieldPath<TuningEditSchema>;
  const setFormValue = (newValue: number) => setValue(formPath_, newValue);

  const sliderMid = Math.floor((min + max) / 2);
  const valueLabelFormatter = (value: number) => (unitChar ? `${value} ${unitChar}` : `${value}`);

  const sliderValue: FormDataType = watch(formPath_);

  const sliderMarks = [
    { value: min, label: minMaxReverse ? max.toString() : min.toString() },
    { value: sliderMid, label: sliderMid.toString() },
    { value: max, label: minMaxReverse ? min.toString() : max.toString() },
  ];

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    // TODO: limit min, max number
    const newvalue = newValue as number;
    setFormValue(newvalue);
  };

  return (
    <Slider
      value={typeof sliderValue === 'number' ? sliderValue : 0}
      onChange={handleSliderChange}
      valueLabelDisplay="auto"
      valueLabelFormat={(v) =>
        minMaxReverse ? valueLabelFormatter(min - v) : valueLabelFormatter(v)
      }
      aria-labelledby="input-slider"
      step={step ? step : 1}
      max={minMaxReverse ? min : max}
      min={minMaxReverse ? max : min}
      marks={sliderMarks}
    />
  );
}

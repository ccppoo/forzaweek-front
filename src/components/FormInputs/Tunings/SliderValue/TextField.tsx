import { FocusEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';
import { rangeNumberInput } from '@/utils/FormInput/rangeNumberInput';
import { getPrecision } from '@/utils/math';

interface SliderValueProp {
  min: number;
  max: number;
  formPath: string;
  height?: number;
  step?: number;
  minMaxReverse?: boolean;
  unitChar?: string;
}

export default function SliderValueTextField(props: SliderValueProp) {
  const { min, max, step, unitChar, minMaxReverse, formPath, height: SliderHeight } = props;
  // const { name: _name, ...sliderProps } = props;

  const { setValue, getValues, watch } = useFormContext<TuningEditSchema>();

  const formPath_ = formPath as FieldPath<TuningEditSchema>;
  type FormDataType = PathValue<TuningEditSchema, FieldPath<TuningEditSchema>>;

  const defaultValue = getValues(formPath_) as number;
  const setFormValue = (newValue: number) => setValue(formPath_, newValue);
  const sliderValue: FormDataType = watch(formPath_);

  const [textValue, setTextValue] = useState<string>(defaultValue?.toString());

  const handleTextInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 유효 숫자인 경우
    const value = event.target.value;
    // const dotEnd = endsWithDot(value);
    // console.log(`handleTextInputValueChange  :${value}`);
    const num = parseFloat(event.target.value);
    const inValidRange = minMaxReverse ? num <= min && num >= max : num >= min && num <= max;
    const inValidStep = getPrecision(num) <= (step || 1 - 1);
    if (Number.isFinite(num) && inValidRange && inValidStep) {
      // console.log(`in valid range : ${num} ,  dotEnd : ${dotEnd}`);
      const newNumberVal = rangeNumberInput(event.target.value, min, max, step, minMaxReverse);
      setFormValue(newNumberVal);
      setTextValue(`${value}`);
      return;
    }
    setTextValue(value);
  };

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    // 입력 다 마치고 슬라이더 값 업데이트
    const numberVal = rangeNumberInput(textValue, min, max, step, minMaxReverse);
    setFormValue(numberVal);
  };

  useEffect(() => {
    if (sliderValue) {
      setTextValue(sliderValue.toString());
    }
  }, [sliderValue, watch, formPath_]);

  return (
    <FlexBox
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingRight: 1,
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
            paddingX: 1,
          },
        }}
        onChange={handleTextInputValueChange}
        onBlur={handleOnBlur}
      />
      {unitChar && unitChar.length < 2 && (
        <FlexBox sx={{ paddingRight: 0.5 }}>
          <Typography>{unitChar}</Typography>
        </FlexBox>
      )}
    </FlexBox>
  );
}

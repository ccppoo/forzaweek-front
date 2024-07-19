import { Box, Typography } from '@mui/material';

import { SliderValue, SliderValueTextField } from '@/components/FormInputs/TuningSlider';
import { FlexBox } from '@/components/styled';

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

export default function SliderValueInput(props: SliderValueProp) {
  const { name, height: SliderHeight, ...sliderProps } = props;

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
        <SliderValue {...sliderProps} />
      </FlexBox>
      <SliderValueTextField {...sliderProps} />
    </Box>
  );
}

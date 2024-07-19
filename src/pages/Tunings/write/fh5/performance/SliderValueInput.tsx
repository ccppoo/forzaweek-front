import { Box, Typography } from '@mui/material';

import { SliderValue, SliderValueTextField } from '@/components/FormInputs/Tunings';
import { FlexBox } from '@/components/styled';

interface SliderValueProp {
  name: string;
  min: number;
  max: number;
  formPath: string;
  step?: number;
  minMaxReverse?: boolean;
  unitChar?: string;
}

export default function SliderValueInput(props: SliderValueProp) {
  const { name, ...sliderProps } = props;

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
        <SliderValue {...sliderProps} />
      </FlexBox>
      <SliderValueTextField {...sliderProps} />
    </Box>
  );
}

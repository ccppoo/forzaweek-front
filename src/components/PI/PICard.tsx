import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import { get_pi_class, get_pi_color } from '@/utils/car';

export function PI_Card({ pi_number, height }: { pi_number: number; height: number }) {
  const PI_CLASS = get_pi_class(pi_number);
  const PI_COLOR = get_pi_color(pi_number);

  return (
    <FlexBox
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: height * 2.5,
      }}
    >
      <FlexBox
        sx={{
          aspectRatio: '1/1',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 25,
          height: height,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          backgroundColor: PI_COLOR,
        }}
      >
        <Typography fontWeight="fontWeightMedium" color="white" sx={{}}>
          {PI_CLASS}
        </Typography>
      </FlexBox>
      <FlexBox
        sx={{
          backgroundColor: 'white',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          minWidth: 50,
          width: height * 1.5,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography fontWeight="fontWeightMedium">{pi_number}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

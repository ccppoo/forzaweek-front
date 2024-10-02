import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import { PIClass } from '@/types';
import { get_pi_class, get_pi_color, get_pi_color_by_class } from '@/utils/car';

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
          border: `2px ${PI_COLOR} solid`,
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
          border: `2px ${PI_COLOR} solid`,
          backgroundColor: 'white',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          minWidth: 30,
          width: height * 1.5,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 15 }}>{pi_number}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

export const PIs = [];

export function PI_Short({ PIClass, height }: { PIClass: PIClass; height: number }) {
  const color = get_pi_color_by_class(PIClass);

  return (
    <FlexBox
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: height * 0.8,
      }}
    >
      <FlexBox
        sx={{
          aspectRatio: '1/1',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 25,
          height: height,
          borderRadius: 1,
          backgroundColor: color,
        }}
      >
        <Typography fontWeight="fontWeightMedium" color="white" sx={{}}>
          {PIClass}
        </Typography>
      </FlexBox>
    </FlexBox>
  );
}

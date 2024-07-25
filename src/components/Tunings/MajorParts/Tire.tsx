import { Typography } from '@mui/material';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { drivingSystem as icon } from '@/image/tuning';
import type { TireType } from '@/types';

// TODO: Tire Icons ?
export default function Suspension({ tire, height }: { tire: string | TireType; height: number }) {
  // const imageSrc = icon[suspension as SuspensionType];

  return (
    <FlexBox
      sx={{
        height,
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 0.5,
        border: '2px #391338 solid',
        borderRadius: 1,
        paddingX: `2px`,
      }}
    >
      {/* <Image
        src={imageSrc}
        sx={{
          objectFit: 'contain',
          aspectRatio: '16/9',
          borderTopLeftRadius: 3,
          borderBottomLeftRadius: 3,
        }}
      /> */}
      <Typography fontWeight={700} fontSize={height * 0.6}>
        {tire}
      </Typography>
    </FlexBox>
  );
}

import { Typography } from '@mui/material';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { drivingSystem as icon } from '@/image/tuning';
import { DrivingSystemType } from '@/types';

export default function DrivingSystem({
  drivingSystem,
  height,
}: {
  drivingSystem: string | DrivingSystemType;
  height: number;
}) {
  const imageSrc = icon[drivingSystem as DrivingSystemType];

  return (
    <FlexBox
      sx={{
        height,
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 0.5,
        border: '2px #391338 solid',
        borderRadius: 1,
      }}
    >
      <Image
        src={imageSrc}
        sx={{
          objectFit: 'contain',
          aspectRatio: '16/9',
          borderTopLeftRadius: 3,
          borderBottomLeftRadius: 3,
        }}
      />
      <Typography fontWeight={700} fontSize={height * 0.6}>
        {drivingSystem}
      </Typography>
    </FlexBox>
  );
}

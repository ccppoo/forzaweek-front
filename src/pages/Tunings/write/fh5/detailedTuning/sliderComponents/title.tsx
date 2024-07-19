import { Box, Typography } from '@mui/material';

import { FlexBox } from '@/components/styled';

interface SliderTitleProp {
  name: string;
  LeftName: string;
  RightName: string;
  unitName?: string;
}

export default function SliderTitle(props: SliderTitleProp) {
  const { name, LeftName, RightName, unitName } = props;
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        minHeight: 60,
        height: '100%',
        gridTemplateColumns: '5fr 4fr 1fr',
      }}
    >
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          paddingX: 1,
        }}
      >
        <Typography variant="h5">{name}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 2,
        }}
      >
        <Typography>{LeftName}</Typography>
        <Typography>{RightName}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>{unitName && unitName}</Typography>
      </FlexBox>
    </Box>
  );
}

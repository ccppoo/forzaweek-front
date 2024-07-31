import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import * as image from '@/image';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

const NavigationButtonList = [
  {
    name: 'Forza Horizon 5',
    image: image.logo.fh5,
  },
  {
    name: 'Forza Horizon 4',
    image: image.logo.fh4,
  },
  {
    name: 'Forza Motorsport 2023',
    image: image.logo.fm2023black,
  },
];

function NavigationButton({ size, image, name }: { size: number; image: string; name: string }) {
  return (
    <FlexBox
      component={ButtonBase}
      sx={{
        columnGap: 1,
        borderRadius: 1,
      }}
    >
      <FlexBox
        sx={{
          alignItems: 'center',
          columnGap: 0.5,
          padding: 0.5,
          borderRadius: 1,
          '&:hover, &.Mui-focusVisible': {
            backgroundColor: '#d4d0c7',
            borderColor: '#a8a6a2',
            boxShadow: 'none',
          },
        }}
      >
        <Image src={image} sx={{ width: size, height: size }} />
        <Typography variant="body1">{name}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

export default function GameSeriesHeader() {
  const naviButtonSize = 35;

  return (
    <FlexBox sx={{ columnGap: 0.5 }}>
      {NavigationButtonList.map((vals) => (
        <NavigationButton
          name={vals.name}
          size={naviButtonSize}
          image={vals.image}
          key={`navi-logo-${vals.name}`}
        />
      ))}
    </FlexBox>
  );
}

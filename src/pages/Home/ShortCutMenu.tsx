// Tuning
import { useNavigate } from 'react-router-dom';

import { SvgIconComponent } from '@mui/icons-material';
import BuildIcon from '@mui/icons-material/Build';
// Deco
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
// Cars
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
// Track
import RouteIcon from '@mui/icons-material/Route';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';

const MenuItems = [
  {
    name: 'Cars',
    path: '/car',
    icon: DirectionsCarFilledOutlinedIcon,
  },
  {
    name: 'Tuning',
    path: '/tuning',

    icon: BuildIcon,
  },
  {
    name: 'Decals',
    path: '/decal',
    icon: ColorLensOutlinedIcon,
  },
  {
    name: 'Tracks',
    path: '/track',

    icon: RouteIcon,
  },
];

function MenuButton({ name, path, Icon }: { name: string; path: string; Icon: SvgIconComponent }) {
  const navigate = useNavigate();

  const goto = () => navigate(path);

  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        borderRadius: 1,
        minWidth: 70,
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: '#d4d0c7',
          borderColor: '#a8a6a2',
          boxShadow: 'none',
        },
      }}
      component={ButtonBase}
      onClick={() => goto()}
    >
      <FlexBox
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 1,
        }}
      >
        <Icon style={{ fontSize: '36px' }} />
        <Typography>{name}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

export default function ShortCutMenu() {
  return (
    <FlexBox sx={{ width: '100%', justifyContent: 'center', paddingTop: 1, columnGap: 1 }}>
      {MenuItems.map(({ name, path, icon }) => (
        <MenuButton name={name} path={path} Icon={icon} />
      ))}
    </FlexBox>
  );
}

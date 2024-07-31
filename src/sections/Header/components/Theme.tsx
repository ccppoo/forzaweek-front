import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useTheme from '@/store/theme';

export default function ThemeHeader() {
  const [theme, themeActions] = useTheme();
  const isLightMode = theme == 'light';

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tooltip title={isLightMode ? '다크모드' : '라이트모드'} arrow>
        <IconButton
          color="default"
          size="medium"
          onClick={themeActions.toggle}
          data-pw="theme-toggle"
        >
          {isLightMode ? (
            <LightModeOutlinedIcon style={{ fontSize: '24px' }} />
          ) : (
            <DarkModeIcon style={{ fontSize: '24px' }} />
          )}
        </IconButton>
      </Tooltip>
    </FlexBox>
  );
}

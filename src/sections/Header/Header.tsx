import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeIcon from '@mui/icons-material/InvertColors';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import * as image from '@/image';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { repository, title } from '@/config';
import useHotKeysDialog from '@/store/hotkeys';
import useLangaugeOption, { langLocale } from '@/store/language';
import useNotifications from '@/store/notifications';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

import MenuNavigation from './MenuNavigation';
import { HotKeysButton } from './styled';
import { getRandomJoke } from './utils';

const LanguageOptions = [
  { option: 'Korean', locale: '한국어' },
  { option: 'English', locale: 'English' },
];

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

function Header() {
  const [, sidebarActions] = useSidebar();
  const [theme, themeActions] = useTheme();
  const [, notificationsActions] = useNotifications();
  const [, hotKeysDialogActions] = useHotKeysDialog();
  const [currentLanguage, changeLanguage] = useLangaugeOption();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function showNotification() {
    notificationsActions.push({
      options: {
        // Show fully customized notification
        // Usually, to show a notification, you'll use something like this:
        // notificationsActions.push({ message: ... })
        // `message` accepts string as well as ReactNode
        // If you want to show a fully customized notification, you can define
        // your own `variant`s, see @/sections/Notifications/Notifications.tsx
        variant: 'customNotification',
      },
      message: getRandomJoke(),
    });
  }

  const isLightMode = theme == 'light';
  const naviButtonSize = 35;
  const MainTitleWidth = 100;

  return (
    <Box sx={{ width: '100%', position: 'sticky' }} data-pw={`theme-${theme}`}>
      <AppBar color="transparent" elevation={1} position="sticky" sx={{ top: 0, paddingX: 0 }}>
        <Toolbar
          variant="dense"
          sx={{ justifyContent: 'space-between', borderBottom: '1px black solid' }}
        >
          <FlexBox sx={{ columnGap: 1 }}>
            {/* title/logo */}
            <FlexBox sx={{ alignItems: 'center', width: MainTitleWidth }}>
              <Button onClick={showNotification} color="info">
                {title}
              </Button>
            </FlexBox>

            {/* game series select */}
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
          </FlexBox>

          {/* lang/dark-light mode / login */}
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Change Language">
                <FlexBox sx={{ columnGap: 1 }} component={ButtonBase} onClick={handleOpenUserMenu}>
                  <LanguageOutlinedIcon style={{ fontSize: '24px' }} />
                  <Typography>{langLocale[currentLanguage]}</Typography>
                </FlexBox>
              </Tooltip>
              <Menu
                sx={{ mt: '30px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {LanguageOptions.map(({ option, locale }) => (
                  <MenuItem
                    key={option}
                    onClick={() => {
                      handleCloseUserMenu();
                      changeLanguage.setLanguageTo(option);
                    }}
                    selected={currentLanguage === option}
                  >
                    <Typography textAlign="center">{locale}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

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
            <FlexBox>
              <Button variant="contained" size="small" sx={{ height: 28 }}>
                로그인
              </Button>
            </FlexBox>
          </FlexBox>
        </Toolbar>
        <MenuNavigation leftPadding={MainTitleWidth} />
      </AppBar>
    </Box>
  );
}

export default Header;

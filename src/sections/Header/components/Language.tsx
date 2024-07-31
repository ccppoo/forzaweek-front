import * as React from 'react';

import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ButtonBase from '@mui/material/ButtonBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useLangaugeOption, { langLocale } from '@/store/language';

const LanguageOptions = [
  { option: 'Korean', locale: '한국어' },
  { option: 'English', locale: 'English' },
];

export default function LanguageHeader() {
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

  return (
    <FlexBox sx={{ flexGrow: 0 }}>
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
    </FlexBox>
  );
}

import { MouseEvent, useEffect, useState } from 'react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { height, width } from '@mui/system';

import { RouterLinkWrapper } from '@/components/Routing/LinkWrapper';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useAuthState from '@/store/auth';
import useUserProfile from '@/store/user';

import './border.css';

function LogginButton() {
  const loginPath = '/login';
  const borderRadius = 1;

  return (
    <RouterLinkWrapper to={loginPath}>
      <FlexBox
        sx={{
          flexDirection: 'row',
          columnGap: 0.8,
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px black solid',
          paddingX: 0.5,
          paddingY: 0.2,
          borderRadius,
        }}
      >
        <Typography fontSize={13}>로그인</Typography>
        <AccountCircleOutlinedIcon />
      </FlexBox>
    </RouterLinkWrapper>
  );
}

function PopoverLogout({ closeMenu }: { closeMenu: () => void }) {
  const [authInfo, state, action] = useAuthState();

  const handleLogout = () => {
    action.clearAuthInfo();
  };

  return (
    <Box
      sx={{ display: 'grid', height: 45, gridTemplateColumns: '3fr 2fr 3fr', cursor: 'default' }}
    >
      <FlexBox
        sx={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        로고
      </FlexBox>
      <Box></Box>
      <FlexBox sx={{ padding: 0.1 }}>
        <FlexBox
          className="gradient"
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
        >
          <Typography textAlign="center">로그아웃</Typography>
        </FlexBox>
      </FlexBox>
    </Box>
  );
}

function PopoverProfilePortal({ closeMenu }: { closeMenu: () => void }) {
  const profile = useUserProfile();

  const userName = profile.gamerTag;
  const userIcon = profile.profileImage;
  const avatarSize = 75;

  const size = { width: avatarSize, height: avatarSize };

  return (
    <Box
      sx={{ display: 'grid', height: '100%', gridTemplateColumns: '3fr 5fr' }}
      onClick={() => {
        closeMenu();
      }}
    >
      <FlexBox sx={{ width: '100%', height: 110, alignItems: 'center', justifyContent: 'center' }}>
        <Avatar alt={userName} src={userIcon} sx={{ ...size }} />
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column', paddingY: 1 }}>
        <Typography variant="subtitle1" fontWeight={500}>
          {userName}
        </Typography>
        <RouterLinkWrapper to={'/profile/me'}>
          <Typography>내 프로필</Typography>
        </RouterLinkWrapper>
      </FlexBox>
    </Box>
  );
}

function UserProfileHeader() {
  const profile = useUserProfile();

  const userName = profile.gamerTag;
  const userIcon = profile.profileImage;

  const avatarSize = 36;
  const size = { width: avatarSize, height: avatarSize };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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
      <FlexBox
        className="gradient"
        sx={{
          columnGap: 0.8,
          alignItems: 'center',
          justifyContent: 'center',
          paddingX: 1,
          paddingY: 0.6,
        }}
        component={ButtonBase}
        onClick={handleOpenUserMenu}
      >
        <Typography>{userName}</Typography>
        <Avatar alt={userName} src={userIcon} sx={{ ...size }} />
      </FlexBox>
      <Popover
        id="menu-appbar"
        sx={{ mt: '30px' }}
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
        <FlexBox
          sx={{
            maxWidth: '100%',
            width: 320,
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <PopoverLogout closeMenu={handleCloseUserMenu} />
          <PopoverProfilePortal closeMenu={handleCloseUserMenu} />
        </FlexBox>
      </Popover>
    </FlexBox>
  );
}

export default function AuthHeader() {
  const [authInfo, state, action] = useAuthState();

  return <FlexBox>{state.loggedIn ? <UserProfileHeader /> : <LogginButton />}</FlexBox>;
}

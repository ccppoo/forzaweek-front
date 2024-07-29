import { useEffect } from 'react';
import MicrosoftLogin from 'react-microsoft-login';
import { useNavigate } from 'react-router-dom';

import { Box, Button, ButtonBase, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { Login as LoginOauth } from '@/api/auth/login';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import xboxIcon from '@/image/xbox.png';

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export default function Login() {
  const navigate = useNavigate();

  const iconSize = 50;
  const borderRadius = 2;

  const onClickLogin = async () => {
    const { redirectTo } = await LoginOauth();
    console.log(`redirectTo : ${redirectTo}`);
    openInNewTab(redirectTo);
  };

  // const SCOPES = ['Xboxlive.signin', 'Xboxlive.offline_access'];
  const SCOPES = ['offline_access'];
  const REDIRECT_URI = 'https://localhost:5173/auth/callback';
  // const REDIRECT_URI = 'https://localhost:8080/auth/callback';
  return (
    <Container sx={{ height: '100%' }}>
      <FullSizeCenteredFlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="contained" onClick={onClickLogin}>
          xbox oauth go
        </Button>
        <Paper sx={{ width: 400, height: 600 }}>
          <FlexBox sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>로그인</Typography>
          </FlexBox>
          <FlexBox
            sx={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button onClick={onClickLogin}>
              <Paper
                sx={{
                  display: 'flex',
                  borderRadius: borderRadius,
                  padding: 1,
                  width: 350,
                  justifyContent: 'center',
                  alignItems: 'center',
                  columnGap: 1,
                }}
              >
                <Image
                  src={xboxIcon}
                  sx={{ width: iconSize, height: iconSize, borderRadius: borderRadius }}
                />
                <FlexBox sx={{ width: '100%', justifyContent: 'center' }}>
                  <Typography fontSize={24}>Login as Xbox</Typography>
                </FlexBox>
              </Paper>
            </Button>
          </FlexBox>
        </Paper>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

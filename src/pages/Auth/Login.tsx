import { useEffect } from 'react';

import { Box, Button, ButtonBase, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { xbox } from '@/api/auth/oauth';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import xboxIcon from '@/image/xbox.png';
import useAuthState from '@/store/auth';

const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export default function Login() {
  const iconSize = 50;
  const borderRadius = 2;
  const [] = useAuthState(); // redirect 받고 로그인 된 것 확인하면 원래 있던 path로 되돌려 보내기

  const onClickLogin = async () => {
    const { redirectTo } = await xbox.Login();
    console.log(`redirectTo : ${redirectTo}`);
    openInNewTab(redirectTo);
  };

  return (
    <Container sx={{ height: '100%' }}>
      <FullSizeCenteredFlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
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

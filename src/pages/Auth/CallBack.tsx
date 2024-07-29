import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Box, Button, ButtonBase, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import { Callback as CallbackOauth } from '@/api/auth/callback';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import xboxIcon from '@/image/xbox.png';

const sections = ['NEWS', 'Week Festa', 'Tunings'];
export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export default function CallBack() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oauth_code = searchParams.get('code'); //
  // console.log(`oauth_code : ${oauth_code}`);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['oauth callback', oauth_code!],
    queryFn: CallbackOauth,
    retry: false,
    enabled: !!oauth_code,
  });

  console.log(`data : ${JSON.stringify(data)}`);

  // 할 것 - 백엔드에서 Token 또는 인증 성공시 탭 닫기 (원래 이전에 있던 창으로 돌아가기)
  return (
    <Container sx={{ height: '100%' }}>
      <FullSizeCenteredFlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ width: 400, height: 600 }}>
          <FlexBox sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Redirecting...</Typography>
          </FlexBox>
        </Paper>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

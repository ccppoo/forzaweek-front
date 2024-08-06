import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { xbox } from '@/api/auth/oauth';
import { EditorBase } from '@/components/Editor';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { db } from '@/db';
import useAuthState from '@/store/auth';

function FreeBoard() {
  const [msg, setMSG] = useState<string>('');
  const [userAuthMSG, setUserAuthMSG] = useState<string>('');
  const [refreshMSG, setRefreshMSG] = useState<string>('');
  const [auth, state, action] = useAuthState();

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', paddingTop: 10, width: '100%' }}>
      <EditorBase imageUpload />
    </Container>
  );
}

export default FreeBoard;

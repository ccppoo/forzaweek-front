import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { dev_check } from '@/api/auth/dev';
import { xbox } from '@/api/auth/oauth';
import {
  updateCarDB,
  updateCarImage,
  updateCar_FH5_meta,
  updateCar_FH5_performance,
  updateManufacturerDB,
  updateNationDB,
  updateTrack,
  updateTrackImage,
} from '@/api/indexedDB/get';
// import { EditorJSInput } from '@/components/Editor';
import { CommentEditor } from '@/components/Editor/editor2';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { db } from '@/db';
import useAuthState from '@/store/auth';

function Dev() {
  const [msg, setMSG] = useState<string>('');
  const [userAuthMSG, setUserAuthMSG] = useState<string>('');
  const [refreshMSG, setRefreshMSG] = useState<string>('');
  const [auth, state, action] = useAuthState();

  const refresh_token = async () => {
    if (auth && auth.refresh_token) {
      const data = await xbox.TokenRefresh({ refreshToken: auth.refresh_token });
      action.setAuthTokens(data);
      setUserAuthMSG(JSON.stringify(data));
      return;
    }
    setUserAuthMSG(`no refresh token`);
  };

  const insertDB2 = async (table: string) => {
    switch (table) {
      case 'nation': {
        await updateNationDB();
        return;
      }
      case 'manufacturer': {
        await updateManufacturerDB();
        return;
      }
      case 'car': {
        await updateCarDB();
        return;
      }
      case 'car_FH5_meta': {
        await updateCar_FH5_meta();
        return;
      }
      case 'car_FH5_performance': {
        await updateCar_FH5_performance();
        return;
      }
      case 'car_image': {
        await updateCarImage();
        return;
      }
      case 'track': {
        await updateTrack();
        return;
      }
      case 'track_image': {
        await updateTrackImage();
        return;
      }
    }
  };

  // console.log(`auth : ${JSON.stringify(auth)}`);
  // console.log(`auth.id_token : ${JSON.stringify(auth.id_token)}`);

  return (
    <>
      <Meta title="Test" />
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 20 }}>
          <FlexBox sx={{ columnGap: 2, rowGap: 4, flexDirection: 'column' }}>
            <FlexBox sx={{ justifyContent: 'center' }}>
              <Typography>update DB</Typography>
            </FlexBox>

            <Grid container sx={{}} rowGap={2}>
              <Grid xs={4} sx={{}}>
                <Button variant="outlined" onClick={() => insertDB2('nation')}>
                  nations
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('manufacturer')}>
                  manufacturers
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('car')}>
                  cars
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('car_FH5_meta')}>
                  car FH5 meta
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('car_FH5_performance')}>
                  car FH5 performance
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('car_image')}>
                  car images
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('track')}>
                  track
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('track_image')}>
                  track images
                </Button>
              </Grid>
            </Grid>
          </FlexBox>

          <FlexBox>
            state : <Typography>{msg}</Typography>
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column' }}>
            <Typography>Token refresh</Typography>
            <Button onClick={refresh_token} variant="contained">
              토큰 refresh
            </Button>
            <Typography>returned : {refreshMSG}</Typography>
          </FlexBox>
          <CommentEditor />
        </FullSizeCenteredFlexBox>
      </Container>
    </>
  );
}

export default Dev;

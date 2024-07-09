import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import {
  updateCarDB,
  updateCarImage,
  updateCar_FH5_meta,
  updateCar_FH5_performance,
  updateManufacturerDB,
  updateNationDB,
} from '@/api/indexedDB/get';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { db } from '@/db';

function Dev() {
  const [msg, setMSG] = useState<string>('');

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
    }
  };

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
            </Grid>
          </FlexBox>

          <FlexBox>
            state : <Typography>{msg}</Typography>
          </FlexBox>
        </FullSizeCenteredFlexBox>
      </Container>
    </>
  );
}

export default Dev;

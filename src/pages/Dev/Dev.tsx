import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useLiveQuery } from 'dexie-react-hooks';

import * as image from '@/image';
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
import { Image } from '@/components/styled';
import { imageMatch } from '@/data/cars';
import carData from '@/data/cars.json';
import trackData from '@/data/track.json';
import { db } from '@/db';
import { Track } from '@/db/schema';

export type FH5_info = {
  division: string;
  PI: number;
  rarity: string;
  boost: string;
  value: number;
  speed: number;
  handling: number;
  acceleration: number;
  launch: number;
  braking: number;
  offroad: number;
};

export type CarInfo = {
  manufacture: string;
  year: number;
  country: string;
  name: string;
  model: string;
  driveTrain: string;
  bodyStyle: string;
  door: number;
  engine: string;
  FH5: FH5_info;
};

export type TrackInfo = {
  name: string;
  name_en: string;
  ko_sound: string;
  en_sound: string;
  ko_trans: string;
  en_trans: string;
  trackType: string;
  courseType: string;
};

function Dev() {
  const [msg, setMSG] = useState<string>('');

  const resetDB = async () => {
    db.tables.forEach(async (table) => await table.clear());
    setMSG('table cleared');
  };

  const insertDB = async () => {
    carData.forEach(async (cardata: CarInfo) => {
      const carID = await db.car.add({
        name: cardata.name,
        year: cardata.year,
        model: cardata.model,
        country: cardata.country,
        driveTrain: cardata.driveTrain,
        door: cardata.door,
        engine: cardata.engine,
        manufacture: cardata.manufacture,
        bodyStyle: cardata.bodyStyle,
      });

      await db.carFH5.add({
        id: carID,
        division: cardata.FH5.division,
        PI: cardata.FH5.PI,
        rarity: cardata.FH5.rarity,
        boost: cardata.FH5.boost,
        value: cardata.FH5.value,
        speed: cardata.FH5.speed,
        handling: cardata.FH5.handling,
        acceleration: cardata.FH5.acceleration,
        launch: cardata.FH5.launch,
        braking: cardata.FH5.braking,
        offroad: cardata.FH5.offroad,
      });

      await db.carImage.add({
        id: carID,
        main: imageMatch[cardata.name] || image.car.hyundaii30n,
        images: [],
      });
    });
    trackData.forEach(async (trackata: TrackInfo) => {
      const trackID = await db.track.add({
        name: trackata.name,
        name_en: trackata.name_en,
        ko_sound: trackata.ko_sound,
        en_sound: trackata.en_sound,
        ko_trans: trackata.ko_trans,
        en_trans: trackata.en_trans,
        trackType: trackata.trackType,
        courseType: trackata.courseType,
      });
    });
    setMSG('data inserted');
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
    }
  };

  return (
    <>
      <Meta title="Test" />
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 20 }}>
          <FlexBox sx={{ columnGap: 2 }}>
            <Button variant="outlined" onClick={resetDB}>
              reset db
            </Button>
            <Button variant="outlined" onClick={insertDB}>
              update db
            </Button>
          </FlexBox>
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

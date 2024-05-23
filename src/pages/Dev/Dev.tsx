import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';

// import { useSubscriber } from '@/socket/subscriber';
import { useLiveQuery } from 'dexie-react-hooks';

import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import carData from '@/data/car_data.json';
import { imageMatch } from '@/data/cars';
import { db } from '@/db';

import { Image } from './styled';

export type FH5_info = {
  division: string;
  PI: number;
};

export type CarInfo = {
  manufacture: string;
  year: number;
  country: string;
  name: string;
  drive_train: string;
  body_style: string;
  door: number;
  engine: string;
  FH5: FH5_info;
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
        country: cardata.country,
        driveTrain: cardata.drive_train,
        door: cardata.door,
        engine: cardata.engine,
        manufacture: cardata.manufacture,
        bodyStyle: cardata.body_style,
      });

      await db.carFH5.add({
        id: carID,
        division: cardata.FH5.division,
        PI: cardata.FH5.PI,
      });
      await db.carImage.add({
        id: carID,
        main: imageMatch[cardata.name],
        images: [],
      });
    });
    setMSG('data inserted');
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

          <FlexBox>
            state : <Typography>{msg}</Typography>
          </FlexBox>
        </FullSizeCenteredFlexBox>
      </Container>
    </>
  );
}

export default Dev;

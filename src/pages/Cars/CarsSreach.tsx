import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import * as image from '@/image';
import { getCars } from '@/api/car';
import { FlexBox } from '@/components/styled';
import { carInfoWithImage } from '@/data/cars';
import { CarData, CarInfo } from '@/data/types';
import { db } from '@/db';
import { getCarData } from '@/db/index';

import CarPreviewCard from './CarPreviewCard';
import TuningCarSelection from './CarSearchFilter';
import { Image } from './styled';

export default function CarSearch() {
  const { data: queryData } = useQuery({
    queryKey: ['get car'],
    queryFn: getCars,
    // staleTime: 10 * 1000,
  });

  if (queryData) {
    return (
      <FlexBox sx={{ flexDirection: 'column' }}>
        {/* car search */}
        <TuningCarSelection />
        {/* Cards */}
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
          }}
          columnSpacing={{ xs: 1, md: 1 }}
          rowSpacing={{ xs: 1, md: 1 }}
        >
          {queryData ? (
            queryData.map((carInfo) => {
              return <CarPreviewCard carInfo={carInfo} key={carInfo.name} />;
            })
          ) : (
            <FlexBox>loading</FlexBox>
          )}
        </Grid>
      </FlexBox>
    );
  }
}

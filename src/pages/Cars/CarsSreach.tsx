import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import { getCars } from '@/api/car';
import { FlexBox } from '@/components/styled';
import { carInfoWithImage } from '@/data/cars';
import { db } from '@/db';
import { getCarData } from '@/db/index';

import CarPreviewCard from './CarPreviewCard';
import {
  CarFilterBoost,
  CarFilterCountry,
  CarFilterDivision,
  CarFilterManufacturer,
  CarFilterProductionYear,
  CarFilterRarity,
} from './filter';
import { Image } from './styled';
import { BOOST, COUNTRY, DIVISIONS, MANUFACTURER, PRODUCTION_YEARs, RARITY } from './values';

function CarFilters() {
  return (
    <FlexBox sx={{ flexDirection: 'column', paddingBottom: 1, rowGap: 0 }}>
      <CarFilterDivision divisions={DIVISIONS} />
      <CarFilterProductionYear productionYears={PRODUCTION_YEARs} />
      <CarFilterRarity rarity={RARITY} />
      <CarFilterBoost boost={BOOST} />
      <CarFilterCountry country={COUNTRY} />
      <CarFilterManufacturer manufacturers={MANUFACTURER} />
    </FlexBox>
  );
}

function CarFilterSummary() {
  // shows total cars after applying filters

  const numberOfCars = 120;

  return (
    <FlexBox sx={{ paddingBottom: 1, width: '100%', height: 45, alignItems: 'center' }}>
      <FlexBox
        sx={{ paddingX: '16px', width: '100%', height: '100%', alignItems: 'center' }}
        component={Paper}
      >
        <Typography>Search Result : total {numberOfCars} cars</Typography>
      </FlexBox>
    </FlexBox>
  );
}

export default function CarSearch() {
  const { data: queryData } = useQuery({
    queryKey: ['get car'],
    queryFn: getCars,
    staleTime: 10 * 1000,
  });

  if (queryData) {
    return (
      <FlexBox sx={{ flexDirection: 'column' }}>
        {/* Filter Options */}
        <CarFilters />
        {/* Sort Options */}
        <CarFilterSummary />
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

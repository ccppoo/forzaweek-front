import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ForwardIcon from '@mui/icons-material/Forward';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { FlexBox } from '@/components/styled';
import { carInfoWithImage } from '@/data/cars';

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
import { CarInfo, FH5_info } from './types';
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
        {carInfoWithImage.map(({ image, info }: { image: string; info: CarInfo }) => {
          return <CarPreviewCard carInfo={info} image={image} key={info.name} />;
        })}

        {/* <CardPreview />
        <CardPreview />
        <CardPreview /> */}
      </Grid>
    </FlexBox>
  );
}

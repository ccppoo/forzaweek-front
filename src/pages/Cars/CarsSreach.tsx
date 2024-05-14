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

import * as image from '@/image';
import MainFullBanner from '@/components/MainFullBanner';
import PostCard from '@/components/PostCard';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

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
    <FlexBox sx={{ flexDirection: 'column', paddingBottom: 2, rowGap: 0 }}>
      <CarFilterDivision divisions={DIVISIONS} />
      <CarFilterProductionYear productionYears={PRODUCTION_YEARs} />
      <CarFilterRarity rarity={RARITY} />
      <CarFilterBoost boost={BOOST} />
      <CarFilterCountry country={COUNTRY} />
      <CarFilterManufacturer manufacturers={MANUFACTURER} />
    </FlexBox>
  );
}

export default function CarSearch() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      {/* Filter Options */}
      <CarFilters />
      {/* Sort Options */}

      {/* Cards */}
      <FlexBox
        sx={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          columnGap: 2,
          rowGap: 1,
          flexWrap: 'wrap',
        }}
      >
        <CarPreviewCard />
        <CarPreviewCard />
        <CarPreviewCard />
        <CarPreviewCard />
        <CarPreviewCard />
        {/* <CardPreview />
        <CardPreview />
        <CardPreview /> */}
      </FlexBox>
    </FlexBox>
  );
}

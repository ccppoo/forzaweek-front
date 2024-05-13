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
import { styled } from '@mui/material/styles';
import { height, minWidth } from '@mui/system';

import * as image from '@/image';
import MainFullBanner from '@/components/MainFullBanner';
import PostCard from '@/components/PostCard';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useCarSearchFilters, { searchOptionMaxLength } from '@/store/carSearchFilters';

import { Image } from './styled';
import { BOOST, COUNTRY, DIVISIONS, MANUFACTURER, PRODUCTION_YEAR, RARITY } from './values';

function DivisionCell({ name }: { name: string }) {
  const [options, { toggleOption }] = useCarSearchFilters();
  const toggleDivisionOption = (name: string) => toggleOption(name, 'division');

  const checked = options.division.includes(name);

  // console.log(name);
  // console.log(JSON.stringify(options.division));
  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,

        paddingX: 1,
        paddingY: 0.5,
        minWidth: 40,
        backgroundColor: checked ? '#dfe2e8' : null,
      }}
      component={ButtonBase}
      onClick={() => toggleDivisionOption(name)}
    >
      <Typography variant="body1">{name}</Typography>
    </FlexBox>
  );
}

function ManufacturerCell({ name }: { name: string }) {
  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        paddingX: 1,
        paddingY: 0.5,
      }}
    >
      <Typography variant="body1">{name}</Typography>
    </FlexBox>
  );
}

function RarityCell({ name }: { name: string }) {
  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        paddingX: 1,
        paddingY: 0.5,
      }}
    >
      <Typography variant="body1">{name}</Typography>
    </FlexBox>
  );
}

function BoostCell({ name }: { name: string }) {
  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        paddingX: 1,
        paddingY: 0.5,
      }}
    >
      <Typography variant="body1">{name}</Typography>
    </FlexBox>
  );
}

function CountryCell({ name }: { name: string }) {
  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        paddingX: 1,
        paddingY: 0.5,
      }}
    >
      <Typography variant="body1">{name}</Typography>
    </FlexBox>
  );
}

function ProductionYearCell({ year }: { year: number }) {
  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        paddingX: 1,
        paddingY: 0.5,
      }}
    >
      <Typography variant="body1">{year} s</Typography>
    </FlexBox>
  );
}

function ManufacturerFilterCharacter({ char }: { char: string }) {
  const FIRST_CHAR = char.toLocaleLowerCase();

  return (
    <FlexBox sx={{ width: '100%', paddingY: 0.2 }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', width: 40 }}>
        <Typography variant="h5">{char.toUpperCase()}</Typography>
      </FlexBox>
      <FlexBox sx={{ columnGap: 1, rowGap: 1, flexWrap: 'wrap', paddingX: 1 }}>
        {MANUFACTURER.filter((value) => value.toLocaleLowerCase().startsWith(FIRST_CHAR)).map(
          (name) => (
            <ManufacturerCell name={name} />
          ),
        )}
      </FlexBox>
    </FlexBox>
  );
}

function CarFilterDivisionSummary() {
  const [options] = useCarSearchFilters();

  const optionName = 'division';
  const tooManyOptions = options.division.length > 4;
  const optionZeroSelected = options.division.length == 0;
  const optionsAllSelected = options.division.length == searchOptionMaxLength.division;
  const optionsSelected = options.division.length;
  const divisionSelected = options.division.slice(0, tooManyOptions ? 4 : options.division.length);

  const summarizedSelection = `and ${options.division.length - 4} more selected`;

  return (
    <FlexBox sx={{ justifyContent: 'flex-start', alignItems: 'center', columnGap: 1 }}>
      {optionZeroSelected ? (
        <FlexBox>
          <Typography>No option selected!</Typography>
        </FlexBox>
      ) : optionsAllSelected ? (
        <FlexBox>
          <Typography>
            Every Option selected (total {optionsSelected} {optionName}s)
          </Typography>
        </FlexBox>
      ) : (
        <>
          {divisionSelected.map((value) => {
            return (
              <FlexBox
                sx={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  border: '1px black solid',
                  borderRadius: 1,
                  paddingX: 0.5,
                }}
              >
                <Typography sx={{}}>{value}</Typography>
              </FlexBox>
            );
          })}
          {tooManyOptions && <Typography sx={{}}>{summarizedSelection}</Typography>}
        </>
      )}
    </FlexBox>
  );
}

function CarFilterDivision() {
  const filterOption = 'division';

  const DIVISION = 'Division';
  const RESET = 'reset';
  const CLEAR_ALL = 'clear all';

  const [options, { selectAllSingleOption, unselectAllSingleOption }] = useCarSearchFilters();
  const onClickReset = () => selectAllSingleOption(filterOption);
  const onClickClearAll = () => unselectAllSingleOption(filterOption);

  const tooManyOptions = options.division.length > 4;
  const optionsAllSelected = options.division.length == searchOptionMaxLength.division;
  const divisionSelected = options.division.slice(0, tooManyOptions ? 4 : options.division.length);

  return (
    <Accordion defaultExpanded disableGutters>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography sx={{ width: 150, flexShrink: 0 }} variant="h6">
          {DIVISION}
        </Typography>
        <CarFilterDivisionSummary />
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ paddingTop: 0.5, paddingBottom: 1 }}>
        <FlexBox
          sx={{
            flexDirection: 'column',
            width: '100%',
            rowGap: 1,
          }}
        >
          <FlexBox
            sx={{
              justifyContent: 'flex-end',
              columnGap: 1,
            }}
          >
            <Tooltip title="reset filter" placement="top">
              <Button variant="contained" size="small" onClick={onClickReset}>
                {RESET}
              </Button>
            </Tooltip>
            <Tooltip title="clear all filter" placement="top">
              <Button variant="contained" size="small" onClick={onClickClearAll}>
                {CLEAR_ALL}
              </Button>
            </Tooltip>
          </FlexBox>
          <FlexBox sx={{ columnGap: 0.8, rowGap: 1.2, flexWrap: 'wrap', paddingX: 1 }}>
            {DIVISIONS.map((name) => (
              <DivisionCell name={name} key={`car-search-filter-division-${name}`} />
            ))}
          </FlexBox>
        </FlexBox>
      </AccordionDetails>
    </Accordion>
  );
}

function CarFilters() {
  const manu_characters = [...new Set<string>([...MANUFACTURER.map((name) => name[0])])].slice(
    0,
    10,
  );

  return (
    <FlexBox sx={{ flexDirection: 'column', paddingBottom: 2, rowGap: 0 }}>
      {/* Filter - Division */}
      <CarFilterDivision />
      {/* Filter - Years */}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ width: '20%', flexShrink: 0 }}>Production Year</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox sx={{ columnGap: 1, rowGap: 2, flexWrap: 'wrap', paddingX: 1 }}>
            {PRODUCTION_YEAR.map((value) => (
              <ProductionYearCell year={value} />
            ))}
          </FlexBox>
        </AccordionDetails>
      </Accordion> */}
      {/* Filter - Rarity */}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ width: '20%', flexShrink: 0 }}>Rarity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox sx={{ columnGap: 1, rowGap: 2, flexWrap: 'wrap', paddingX: 1 }}>
            {RARITY.map((value) => (
              <RarityCell name={value} />
            ))}
          </FlexBox>
        </AccordionDetails>
      </Accordion> */}
      {/* Filter - Boost */}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ width: '20%', flexShrink: 0 }}>BOOST</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox sx={{ columnGap: 1, rowGap: 2, flexWrap: 'wrap', paddingX: 1 }}>
            {BOOST.map((value) => (
              <BoostCell name={value} />
            ))}
          </FlexBox>
        </AccordionDetails>
      </Accordion> */}
      {/* Filter - Country */}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ width: '20%', flexShrink: 0 }}>Country</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox sx={{ columnGap: 1, rowGap: 2, flexWrap: 'wrap', paddingX: 1 }}>
            {COUNTRY.map((value) => (
              <CountryCell name={value} />
            ))}
          </FlexBox>
        </AccordionDetails>
      </Accordion> */}

      {/* Filter - Manufactures */}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Manufacturer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox sx={{ columnGap: 1, rowGap: 1.2, flexWrap: 'wrap', paddingX: 1 }}>
            {manu_characters.map((value) => (
              <ManufacturerFilterCharacter char={value} />
            ))}
          </FlexBox>
        </AccordionDetails>
      </Accordion> */}
    </FlexBox>
  );
}

function Car() {
  // 자동차 사진 + 이름, 클래스, 기본적인거 추가

  const W = 250;
  const H = 150;

  const FULL_NAME = '#98 Bryan Herta Autosport Elantra N';
  const MANUFACTURER = 'Hyundai';
  const COUNRTY = 'Korea';
  const YEAR = 2021;
  // 간단 스탯
  const PI = 800;
  const DRIVE_TRAIN = 'FWD';
  // 실제 차량 분류
  const BODY_STYLE = 'Sedan';
  const DIVISION_RW = 'Sport Sedan';

  return (
    <FlexBox
      sx={{
        minWidth: 300,
        width: '48%',
        maxWidth: 600,
        height: H,
        border: '1px black solid',
        borderRadius: 1,
        padding: 0.5,
      }}
    >
      <FlexBox sx={{ maxWidth: W, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          src={image.car.hyundaiElantra}
          sx={{ width: 'auto', height: '100%', paddingRight: 0.5, paddingY: 0.5 }}
        />
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox>
          {/* 이름이 긴 경우 줄넘김 할 수 있도록 이름 아래에 한 칸 여유 남겨 놓을 것 */}
          <Typography variant="h6">{FULL_NAME}</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          {/* 여기 항목들은 길어서 줄넘김이 일어날 수 있는 것들 */}
          <FlexBox>
            {/* 제조사 로고 + 이름 */}
            {/* 이름이 긴 경우 줄넘김 할 수 있도록 이름 아래에 한 칸 여유 남겨 놓을 것 */}
            <Typography variant="body1">{MANUFACTURER}</Typography>
          </FlexBox>
          <FlexBox>
            {/* 국기 + 국가 이름 */}
            <Typography>{COUNRTY}</Typography>
          </FlexBox>
          {/* 연도 */}
          <Typography>{YEAR}</Typography>
          <FlexBox></FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1, rowGap: 0.5, flexDirection: 'column' }}>
          {/* 줄넘김 없고, 길이가 한정된 것들 */}
          <FlexBox sx={{ columnGap: 1 }}>
            {/* == 인게임 스탯 == */}
            <FlexBox sx={{ border: '1px black solid', borderRadius: 0.8, paddingX: 0.5 }}>
              {/* PI, 색 반영해서 이쁘게 바꿀 것 */}
              <Typography variant="body1">{PI}</Typography>
            </FlexBox>
          </FlexBox>
          <FlexBox sx={{ columnGap: 1, justifyContent: 'start' }}>
            {/* == 현실 스탯 == */}
            <FlexBox sx={{ border: '1px black solid', borderRadius: 0.8, paddingX: 0.5 }}>
              {/* 사륜/전륜/후륜 */}
              <Typography variant="body1">{DRIVE_TRAIN}</Typography>
            </FlexBox>
            <FlexBox sx={{ border: '1px black solid', borderRadius: 0.8, paddingX: 0.5 }}>
              {/* Body Style - 세단/왜건/해치백 */}
              <Typography variant="body1">{BODY_STYLE}</Typography>
            </FlexBox>
            <FlexBox sx={{ border: '1px black solid', borderRadius: 0.8, paddingX: 0.5 }}>
              {/* Division - 인게임 분류아님 */}
              <Typography variant="body1">{DIVISION_RW}</Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
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
        <Car />
        <Car />
        <Car />
        <Car />
        {/* <CardPreview />
        <CardPreview />
        <CardPreview /> */}
      </FlexBox>
    </FlexBox>
  );
}

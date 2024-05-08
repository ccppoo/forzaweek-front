import { useNavigate } from 'react-router-dom';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ForwardIcon from '@mui/icons-material/Forward';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
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
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { height } from '@mui/system';

import * as image from '@/image';
import MainFullBanner from '@/components/MainFullBanner';
import PostCard from '@/components/PostCard';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import { Image } from './styled';
import { BOOST, COUNTRY, DIVISIONS, MANUFACTURER, PRODUCTION_YEAR, RARITY } from './values';

function DivisionCell({ name }: { name: string }) {
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
    <FlexBox sx={{ width: '100%' }}>
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

function CarFilters() {
  const manu_characters = [...new Set<string>([...MANUFACTURER.map((name) => name[0])])].slice(
    0,
    10,
  );

  return (
    <FlexBox sx={{ flexDirection: 'column', paddingBottom: 2, rowGap: 2 }}>
      {/* Filter - Division */}
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ paddingBottom: 1 }}>
          <Typography variant="h5">Division</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1, rowGap: 2, flexWrap: 'wrap', paddingX: 1 }}>
          {DIVISIONS.map((name) => (
            <DivisionCell name={name} />
          ))}
        </FlexBox>
      </FlexBox>
      {/* Filter - Years */}
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ paddingBottom: 1 }}>
          <Typography variant="h5">Production Year</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1, rowGap: 2, flexWrap: 'wrap', paddingX: 1 }}>
          {PRODUCTION_YEAR.map((value) => (
            <ProductionYearCell year={value} />
          ))}
        </FlexBox>
      </FlexBox>
      {/* Filter - Rarity */}
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ paddingBottom: 1 }}>
          <Typography variant="h5">Rarity</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1, rowGap: 2, flexWrap: 'wrap', paddingX: 1 }}>
          {RARITY.map((value) => (
            <RarityCell name={value} />
          ))}
        </FlexBox>
      </FlexBox>

      {/* Filter - Boost */}
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ paddingBottom: 1 }}>
          <Typography variant="h5">BOOST</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1, rowGap: 2, flexWrap: 'wrap', paddingX: 1 }}>
          {BOOST.map((value) => (
            <BoostCell name={value} />
          ))}
        </FlexBox>
      </FlexBox>

      {/* Filter - Country */}
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ paddingBottom: 1 }}>
          <Typography variant="h5">Country</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1, rowGap: 2, flexWrap: 'wrap', paddingX: 1 }}>
          {COUNTRY.map((value) => (
            <CountryCell name={value} />
          ))}
        </FlexBox>
      </FlexBox>

      {/* Filter - Manufactures */}
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ paddingBottom: 1 }}>
          <Typography variant="h5">Manufacturer</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1, rowGap: 1.2, flexWrap: 'wrap', paddingX: 1 }}>
          {manu_characters.map((value) => (
            <ManufacturerFilterCharacter char={value} />
          ))}
        </FlexBox>
      </FlexBox>
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
        <Image src={image.car.hyundaiElantra} sx={{ width: 'auto', height: '100%' }} />
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

export default function Cars() {
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

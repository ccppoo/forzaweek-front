import { useState } from 'react';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import * as image from '@/image';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0].toUpperCase()}`,
  };
}

function DecalItemCell({ decal }: { decal: DecalData }) {
  const carName = '#98 Bryan Herta Autosport Elantra N';

  const HEIGHT = 360;
  const share_code3 = [
    decal.share_code.substring(0, 3),
    decal.share_code.substring(3, 6),
    decal.share_code.substring(6, 9),
  ];

  return (
    <Grid xs={4}>
      <Paper
        sx={{
          minWidth: 350,
          height: HEIGHT,
          display: 'grid',
          gridTemplateRows: '30px 208px 90px 32px',
          // flexDirection: 'column',
          // justifyContent: 'start',
        }}
      >
        {/* 자동차 제조사/이름 */}
        <FlexBox sx={{ paddingX: 1, paddingY: 0.2, alignItems: 'center', columnGap: 1 }}>
          {/* <Image src={image.manufacturer.hyundai} sx={{ width: 25, height: 25 }} /> */}
          {/* <Typography>{decal.creater}</Typography> */}
          {/* 만든사람 */}
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Avatar
              {...stringAvatar(decal.creater)}
              sx={{ width: 20, height: 20, fontSize: '15px' }}
            />
            <Typography sx={{ fontSize: '18px', fontWeight: 300 }}>{decal.creater}</Typography>
          </FlexBox>
        </FlexBox>
        {/* 사진 */}
        <FlexBox sx={{ aspectRatio: '16/9' }}>
          <Image
            src={decal.frontImage}
            sx={{
              objectFit: 'contain',
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}
          />
        </FlexBox>
        {/* 데칼 태그*/}
        <FlexBox
          sx={{
            // height: '100%',
            flexWrap: 'wrap',
            columnGap: 0.2,
            rowGap: 0.4,
            justifyContent: 'start',
            alignItems: 'start',
            paddingX: 0.5,
            paddingTop: 0.3,
            alignContent: 'flex-start',
          }}
        >
          {decal.tags.map((tag) => (
            <Chip label={tag} key={`decal-tag-${decal.share_code}-${tag}`} />
          ))}
        </FlexBox>
        {/*  댓글 + 좋아요 */}
        <FlexBox sx={{ height: 32, width: '100%', justifyContent: 'end' }}>
          <IconButton sx={{ borderRadius: 1, paddingY: `2px`, paddingX: `4px` }}>
            <ModeCommentOutlinedIcon sx={{ fontSize: 15 }} />
            <FlexBox
              sx={{
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 0.5,
              }}
            >
              <Typography>{decal.fav.count}</Typography>
            </FlexBox>
          </IconButton>
          <IconButton sx={{ borderRadius: 1, paddingY: `2px`, paddingX: `4px` }}>
            {decal.fav.checked ? (
              <FavoriteOutlinedIcon sx={{ fontSize: 15 }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{ fontSize: 15 }} />
            )}
            <FlexBox
              sx={{
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 0.5,
              }}
            >
              <Typography>{decal.fav.count}</Typography>
            </FlexBox>
          </IconButton>
        </FlexBox>
      </Paper>
    </Grid>
  );
}

function DecalCellListingHeader() {
  const carDetail = {
    manufacture: 'Hyundai',
    year: 2021,
    country: 'Korea',
    name: '#98 Bryan Herta Autosport Elantra N',
    drive_train: 'FWD',
    body_style: 'sedan',
    door: 4,
    engine: 'ICE',
    FH5: {
      PI: 800,
      division: 'track toys',
    },
  };

  // 목차 시작, 자동차 사진 + 이름
  return (
    <FlexBox sx={{ flexDirection: 'row', paddingBottom: 2 }}>
      {/* 자동차 사진 */}
      <FlexBox sx={{ height: 80, aspectRatio: '16/9', maxWidth: '100%', alignItems: 'center' }}>
        <Image src={image.car.hyundaiElantra} sx={{ objectFit: 'contain' }} />
      </FlexBox>
      {/* 제조사, 이름, 연식 */}
      <FlexBox sx={{ flexDirection: 'column', paddingLeft: 1, justifyContent: 'center' }}>
        {/* 제조사 */}
        <FlexBox>
          <FlexBox
            sx={{
              aspectRatio: '1/1',
              height: 30,
            }}
          >
            <Image
              src={image.manufacturer.hyundai}
              sx={{
                objectFit: 'contain',
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            />
          </FlexBox>
          <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
            <Typography variant="subtitle2">{carDetail.manufacture}</Typography>
          </FlexBox>
        </FlexBox>

        <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
          <FlexBox>
            <Typography variant="subtitle1">{carDetail.name}</Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function DecalShowMore() {
  // more -> search filter 보여주고 있는 차로 세팅 -> 재검색
  return (
    <FlexBox sx={{ justifyContent: 'end', paddingX: 1, paddingTop: 1 }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', marginX: 1 }}>
        <Button>more</Button>
      </FlexBox>
    </FlexBox>
  );
}

export default function DecalCellListing() {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column' }}>
      <DecalCellListingHeader />
      <Grid container sx={{ width: '100%', minWidth: 1150 }} spacing={2}>
        {decalsWithImage.map((decal) => (
          <DecalItemCell decal={decal} key={`decal-item-cell-${decal.share_code}`} />
        ))}
      </Grid>
      <DecalShowMore />
      {/* <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
        <Pagination count={10} page={page} onChange={handleChange} size="large" />
      </FlexBox> */}
    </FlexBox>
  );
}

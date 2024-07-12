import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';

import type { DecalSchemaReadType } from '@/FormData/decal';
import { GetDecal } from '@/api/data/fh5/decal';
import { BriefCarInfo2 } from '@/components/Car/BriefCarInfo';
import Comments from '@/components/Comment';
import { RelatedDecals } from '@/components/Decals';
import { ImageShowHorizontal } from '@/components/ImageList/Horizontal';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

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

function TitlePart() {
  const carName = '#98 Bryan Herta Autosport Elantra N';
  return (
    <FlexBox sx={{ width: '100%', height: 50, columnGap: 1 }}>
      {/* 트랙 아이콘 */}
      <FlexBox
        sx={{
          aspectRatio: '1/1',
          height: '100%',
        }}
      >
        {/* <Image
          src={}
          sx={{
            objectFit: 'contain',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        /> */}
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
        <Typography variant="h4">{carName}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

function DecalInfo({ decalData }: { decalData: DecalSchemaReadType }) {
  const creator = decalData.creator;

  const share_code3 = [
    decalData.share_code.substring(0, 3),
    decalData.share_code.substring(3, 6),
    decalData.share_code.substring(6, 9),
  ];

  decalData.tags;

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
      {/* 제작자 */}
      <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
        <Avatar {...stringAvatar(creator)} sx={{ width: 35, height: 35 }} />
        <Typography variant="h5">{creator}</Typography>
      </FlexBox>
      {/* 태그 */}
      <FlexBox sx={{ columnGap: 0.5, alignContent: 'flex-start' }}>
        {decalData.tags.map((tag) => {
          return (
            <Chip label={tag.name_en} key={`decal-${decalData.share_code}-data-tag-${tag.id}`} />
          );
        })}
      </FlexBox>
      {/* 공유 코드 */}
      <FlexBox
        sx={{
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <Typography>Share code : </Typography>
        <FlexBox
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 1,
            paddingX: 1,
            borderRadius: 1,
            marginLeft: 1,
            backgroundColor: '#d1d1d1',
          }}
        >
          {share_code3.map((code_peice) => {
            return (
              <Typography variant="h6" key={`decal-row-share-code-piece-${code_peice}`}>
                {code_peice}
              </Typography>
            );
          })}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default function DecalDetail() {
  const { decalID } = useParams();

  const { data } = useQuery({
    queryFn: GetDecal,
    queryKey: ['get decal', decalID!],
  });

  const WIDTH = '100%';

  if (data) {
    console.log(`data : ${JSON.stringify(data)}`);
    return (
      <Container sx={{ paddingTop: 2 }}>
        <FullSizeCenteredFlexBox
          sx={
            {
              // height: '100%',
            }
          }
        >
          <FlexBox
            sx={{
              width: WIDTH,
              maxWidth: 1200,
              flexDirection: 'column',
              paddingY: 2,
              paddingX: 2,
              rowGap: 2,
            }}
            component={Paper}
          >
            {/* 제목 */}
            {/* <TitlePart /> */}
            {/* 데칼 태그, 게시자, 공유 코드 */}
            <DecalInfo decalData={data} />
            <ImageShowHorizontal images={data.imageURLs} />
            {/* 데칼에 사용된 차 간단 정보 */}
            <BriefCarInfo2 carInfo={data.car} />
            {/* 댓글 */}
            <Comments />
            {/* 다른 데칼 */}
            <RelatedDecals carID={data.car.id} />
          </FlexBox>
        </FullSizeCenteredFlexBox>
      </Container>
    );
  }
}

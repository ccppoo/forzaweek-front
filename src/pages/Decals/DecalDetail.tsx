import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import type { DecalSchemaReadType } from '@/FormData/decal';
import { GetDecal, GetDecalImageUpload, GetDecalImageUploadIDs } from '@/api/fh5/decal';
import { BriefCarInfo2 } from '@/components/Car/BriefCarInfo';
import { TempComments } from '@/components/Comment/Comments';
import { RelatedDecals } from '@/components/Decals';
import { ImageShowHorizontal } from '@/components/ImageList/Horizontal';
import Tagging from '@/components/Tag/Tagging';
import Tags from '@/components/Tag/Tags';
import TagAdder from '@/components/TagAdd';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { getCarFH5FullType } from '@/db/query/fh5/car';
import type { DecalImageRead, DecalRead } from '@/schema/fh5/decal';
import useAuthState from '@/store/auth';

import { DecalImages } from './DecalImages';

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

function DecalBaseCar({ carFH5ID }: { carFH5ID: string }) {
  // carFH5ID
  const carFH5 = useLiveQuery(async () => await getCarFH5FullType(carFH5ID), [carFH5ID]);

  if (carFH5) {
    const carFH5name = carFH5.baseCar.name.en;

    return (
      <FlexBox sx={{ flexDirection: 'column' }}>
        <Image src={carFH5.imageURLs[0]} sx={{ objectFit: 'contain', height: 160 }} />
        <Typography>{carFH5name}</Typography>
      </FlexBox>
    );
  }
}

function DecalShareCodeName({ decalRead }: { decalRead: DecalRead }) {
  const creator = decalRead.gamerTag;

  const share_code3 = [
    decalRead.shareCode.substring(0, 3),
    decalRead.shareCode.substring(3, 6),
    decalRead.shareCode.substring(6, 9),
  ];

  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
        <Avatar {...stringAvatar(creator)} sx={{ width: 35, height: 35 }} />
        <Typography variant="h5">{creator}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <Typography>Share code</Typography>
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

function DecalInfo({ decalID }: { decalID: string }) {
  const [{ id_token }] = useAuthState();

  const { data } = useQuery({
    queryFn: GetDecal,
    queryKey: ['get decal', decalID!, id_token],
  });

  data?.name;
  if (data) {
    return (
      <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
        <Grid container>
          <Grid xs={12} sm={6}>
            {/* 제작자 */}
            <DecalShareCodeName decalRead={data} />
          </Grid>
          <Grid xs={12} sm={6}>
            <DecalBaseCar carFH5ID={data.baseCar} />
          </Grid>
        </Grid>
      </FlexBox>
    );
  }
}

export default function DecalDetail() {
  const { decalID } = useParams();

  const TOPIC = 'decal';

  const WIDTH = '100%';

  // console.log(`data : ${JSON.stringify(data)}`);
  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox
        sx={{
          // height: '100%',
          paddingX: 2,
        }}
      >
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
            flexDirection: 'column',
            paddingY: 2,
            rowGap: 2,
          }}
          component={Paper}
        >
          {/* 제목 */}
          {/* <TitlePart /> */}
          <FlexBox
            sx={{
              width: '100%',
              height: '100%',
              paddingX: 2,
              paddingY: 1,
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
            }}
          >
            <DecalInfo decalID={decalID!} />
          </FlexBox>

          <FlexBox
            sx={{
              width: '100%',
              height: '100%',
              paddingX: 2,
              paddingY: 1,
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
            }}
          >
            <DecalImages decalID={decalID!} />
          </FlexBox>
          {/* 태그 */}
          <FlexBox
            sx={{
              width: '100%',
              height: '100%',
              paddingX: 2,
              paddingY: 1,
              flexDirection: 'column',
              backgroundColor: '#EEEEEE',
            }}
          >
            <Tags topic={TOPIC} subjectID={decalID!} />
            {/* 태그 달기 */}
            <Tagging topic={TOPIC} subjectID={decalID!} />
          </FlexBox>
          {/* 댓글 */}
          <FlexBox sx={{ flexDirection: 'column', paddingX: 2, paddingY: 1 }}>
            <TempComments />
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column', paddingX: 2, paddingY: 1 }}>
            {/* 다른 데칼 */}
            <RelatedDecals decalID={decalID!} />
          </FlexBox>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

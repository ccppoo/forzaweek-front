import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import * as image from '@/image';
import type { TrackSchemaType } from '@/FormData/tracks/fh5';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

export default function BriefData({ track }: { track: TrackSchemaType }) {
  const track_type = 'circuit';
  const description = 'design of Hyundai elantra, its my style';

  const fullPathImage = track.fullPathImage.zoom_in || track.fullPathImage.zoom_out;

  return (
    <FlexBox sx={{ width: '100%', height: '100%' }}>
      <FlexBox sx={{ paddingTop: 1 }}>
        {/* 트랙 사진 */}
        <FlexBox sx={{ aspectRatio: '16/9', height: 270 }}>
          <Image src={fullPathImage} sx={{ objectFit: 'contain' }} />
        </FlexBox>
        {/* 트랙 특징 설명 */}
        <FlexBox
          sx={{
            height: '100%',
            flexDirection: 'column',
            paddingLeft: 2,
          }}
        >
          <FlexBox sx={{ flexDirection: 'column' }}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body1">{description}</Typography>
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column' }}>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">Road Type : </Typography>
              <Typography variant="h6">{track.category}</Typography>
            </FlexBox>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">Track Type : </Typography>
              <Typography variant="h6">{track.format}</Typography>
              <Typography>laps: {track.laps}</Typography>
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', columnGap: 1 }}>
              <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
                <Typography variant="h6">Tags : </Typography>
                <Typography variant="h6">{track_type}</Typography>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

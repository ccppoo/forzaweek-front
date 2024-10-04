import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import type { SharingCreationReq } from '@/FormData/post/sharingCreation/base';
import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

export default function ShareCode({ shareCode }: { shareCode: string }) {
  // const { share_code } = data;

  const share_code3 = [
    shareCode.substring(0, 3),
    shareCode.substring(3, 6),
    shareCode.substring(6, 9),
  ];

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
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

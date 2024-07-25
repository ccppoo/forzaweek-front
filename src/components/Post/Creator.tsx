import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import type { SharingCreationReq } from '@/FormData/post/sharingCreation/base';
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
export default function SharingCreationCreator(data: SharingCreationReq) {
  const { creator } = data;

  return (
    <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
      <Avatar {...stringAvatar(creator)} sx={{ width: 35, height: 35 }} />
      <Typography variant="h5">{creator}</Typography>
    </FlexBox>
  );
}

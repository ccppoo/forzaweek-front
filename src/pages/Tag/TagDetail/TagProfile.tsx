import { useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { SxProps, Theme } from '@mui/material/styles';

import { useQuery } from '@tanstack/react-query';

import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import useAuthState from '@/store/auth';

import BlueArchive from './Blue_Archive.svg';

interface ImageProps {
  src: string | undefined;
  sx?: SxProps<Theme>;
}

const temp = async () => {
  return { data: {} };
};
function TagProfileImage({ sx, src }: ImageProps) {
  const imageWidth = 150;
  const imageSize = { width: imageWidth, height: imageWidth };

  return (
    <Image
      src={src}
      sx={{ ...imageSize, border: '1px black solid', objectFit: 'contain', ...sx }}
    />
  );
}

interface TagProfileIntf {
  tagID: string;
}

export default function TagProfile(props: TagProfileIntf) {
  const { tagID } = props;
  const tagCreatedAt = new Date('2024-08-20 14:00:19');

  const { data } = useQuery({ queryKey: ['tag', 'profile', tagID], queryFn: temp });

  return (
    <FlexBox>
      <TagProfileImage src={BlueArchive} />
      <FlexBox sx={{ paddingX: 2, flexDirection: 'column' }}>
        <FlexBox sx={{ columnGap: 2 }}>
          <Typography variant="h5" fontWeight={300}>
            Name
          </Typography>
          <Typography variant="h5">Blue Archive</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 2 }}>
          <Typography variant="h5" fontWeight={300}>
            Category
          </Typography>
          <Typography variant="h5">Game</Typography>
        </FlexBox>
        <FlexBox sx={{ columnGap: 2 }}>
          <Typography variant="h5" fontWeight={300}>
            created
          </Typography>
          <Typography variant="h5">{tagCreatedAt.toLocaleString()}</Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

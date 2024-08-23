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

const temp = async () => {
  return { data: {} };
};

interface RelatedTagsIntf {
  tagID: string;
  relation: 'mereged' | 'children' | 'parent';
}

function RelatedTags(props: RelatedTagsIntf) {
  const { tagID, relation } = props;
  const { data } = useQuery({
    queryKey: ['tags', 'mereged', tagID],
    queryFn: temp,
  });
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <Typography variant="h6">{relation} tag</Typography>
      <FlexBox></FlexBox>
    </FlexBox>
  );
}

interface TagRelationsIntf {
  tagID: string;
}

export default function TagRelations(props: TagRelationsIntf) {
  const { tagID } = props;
  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 4 }}>
      <Typography variant="h4">Related Tags</Typography>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
        <RelatedTags tagID={tagID} relation="mereged" />
        <RelatedTags tagID={tagID} relation="parent" />
        <RelatedTags tagID={tagID} relation="children" />
      </FlexBox>
    </FlexBox>
  );
}

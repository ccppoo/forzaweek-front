import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import useAuthState from '@/store/auth';

import TagExplainations from './TagExplaination';
import TagProfile from './TagProfile';
import TagRelations from './TagRelations';

type TagPagePathParam = {
  tagID: string;
};

export default function TagDetail() {
  const { tagID } = useParams() as TagPagePathParam;

  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FlexBox sx={{ width: '100%', height: '100%', flexDirection: 'column', rowGap: 3 }}>
        <FlexBox>
          <Typography variant="h3">{'Game > Blue Archive'}</Typography>
        </FlexBox>
        <TagProfile tagID={tagID} />
        <TagExplainations tagID={tagID} />
        <TagRelations tagID={tagID} />
      </FlexBox>
    </Container>
  );
}
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { useQuery } from '@tanstack/react-query';

import type { TagDependentCreation } from '@/FormData/post/tag';
import { GetTagByID } from '@/api/tag/tag';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

export function TagChip({ tagID }: { tagID: string }) {
  // TODO: tagID -> react-query로 데이터 가져오기

  const { data } = useQuery({
    queryKey: ['get-tag', tagID],
    queryFn: GetTagByID,
  });

  if (data) {
    const TagLabel = data.name.en;
    const TagIconSrc = data.imageURL;

    return (
      <Chip
        avatar={TagIconSrc ? <Avatar alt={`${TagLabel}-icon`} src={TagIconSrc} /> : undefined}
        label={TagLabel}
        variant="outlined"
      />
    );
  }
}

export default function Tags(props: TagDependentCreation) {
  const { tags } = props;
  return (
    <FlexBox sx={{ columnGap: 0.5, alignContent: 'flex-start' }}>
      {tags.map((tag) => {
        return <TagChip tagID={tag} key={`tuning-tag-${tag}`} />;
      })}
    </FlexBox>
  );
}

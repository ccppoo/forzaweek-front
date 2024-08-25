import { Paper, Typography } from '@mui/material';

import type { TagCategoryReadOnly } from '@/FormData/tag/tag';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

export default function TagCategoryItemCell({ tagCategory }: { tagCategory: TagCategoryReadOnly }) {
  const tagName = tagCategory.name.en;

  return (
    <Paper
      sx={{
        display: 'flex',
        height: 48,
        paddingX: 1,
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: 'fit-content',
        columnGap: 1.5,
      }}
    >
      {tagCategory.imageURL && (
        <FlexBox sx={{ aspectRatio: '1/1', height: '40px', alignItems: 'center' }}>
          <Image src={tagCategory.imageURL} sx={{ objectFit: 'contain' }} />
        </FlexBox>
      )}
      <FlexBox sx={{ alignItems: 'center' }}>
        <Typography>{tagName}</Typography>
      </FlexBox>
    </Paper>
  );
}

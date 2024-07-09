import { Paper, Typography } from '@mui/material';

import type { TagKindType } from '@/FormData/tag';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

export default function TagKindItemCell({ tagKind }: { tagKind: TagKindType.TagKindSchemaType }) {
  const tagName = tagKind.name_en;

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
      {tagKind.imageURL && (
        <FlexBox sx={{ aspectRatio: '1/1', height: '40px', alignItems: 'center' }}>
          <Image src={tagKind.imageURL} sx={{ objectFit: 'contain' }} />
        </FlexBox>
      )}
      <FlexBox sx={{ alignItems: 'center' }}>
        <Typography>{tagName}</Typography>
      </FlexBox>
    </Paper>
  );
}

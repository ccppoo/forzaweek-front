import { useFormContext } from 'react-hook-form';

import { Paper, Typography } from '@mui/material';

import type { DecalEditSchema } from '@/FormData/decal';
import { TagItemCell } from '@/components/Tag';
import { TagSearchCreateTextFeild } from '@/components/TagSearchCreate';
import { FlexBox, Image } from '@/components/styled';

export default function AddTags() {
  const { setValue, getValues, watch } = useFormContext<DecalEditSchema>();

  const deleteAddedTag = (tagIndex: number) => {
    const tags = getValues('tags');
    setValue(
      'tags',
      tags.filter((_, idx) => idx != tagIndex),
    );
  };
  const tagsAdded = watch('tags');

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
      <TagSearchCreateTextFeild />
      <Paper sx={{ backgroundColor: 'EEEEEE', paddingX: 1, paddingY: 1, minHeight: 64 }}>
        {tagsAdded.length > 0 ? (
          <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1, rowGap: 1 }}>
            {tagsAdded.map((tagID, idx) => (
              <TagItemCell
                tag={tagID}
                key={`decal-write-tag-input-${tagID}-${idx}`}
                onClickDelete={() => deleteAddedTag(idx)}
              />
            ))}
          </FlexBox>
        ) : (
          <FlexBox sx={{ alignItems: 'center', height: '100%' }}>
            <Typography fontWeight={300}>Add tags that could describe this decal</Typography>
          </FlexBox>
        )}
      </Paper>
    </FlexBox>
  );
}

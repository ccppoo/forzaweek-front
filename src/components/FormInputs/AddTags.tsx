import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Paper, Typography } from '@mui/material';

import type { TagDependentCreation } from '@/FormData/post/sharingCreation';
import { TagItemCell } from '@/components/Tag';
import { TagSearchCreateTextFeild } from '@/components/TagSearchCreate';
import { FlexBox, Image } from '@/components/styled';

type TagDepenednt = 'decal' | 'tuning';

type SelectCarFormInput = {
  selectScope: string;
  postType: TagDepenednt;
};

export default function AddTags<T extends TagDependentCreation>(props: SelectCarFormInput) {
  const { selectScope, postType } = props;

  const { setValue, getValues, watch } = useFormContext<T>();

  const formPath = 'tags' as FieldPath<T>;
  type FormDataType = PathValue<T, FieldPath<T>>;

  const deleteAddedTag = (tagIndex: number) => {
    const tags: string[] = getValues(formPath);
    setValue(formPath, tags.filter((_, idx) => idx != tagIndex) as FormDataType);
  };
  const tagsAdded: string[] = watch(formPath);

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
      <TagSearchCreateTextFeild />
      <Paper sx={{ backgroundColor: 'EEEEEE', paddingX: 1, paddingY: 1, minHeight: 64 }}>
        {tagsAdded.length > 0 ? (
          <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1, rowGap: 1 }}>
            {tagsAdded.map((tagID, idx) => (
              <TagItemCell
                tag={tagID}
                key={`${selectScope}-write-tag-input-${tagID}-${idx}`}
                onClickDelete={() => deleteAddedTag(idx)}
              />
            ))}
          </FlexBox>
        ) : (
          <FlexBox sx={{ alignItems: 'center', height: '100%' }}>
            <Typography fontWeight={300}>Add tags that could describe this {postType}</Typography>
          </FlexBox>
        )}
      </Paper>
    </FlexBox>
  );
}

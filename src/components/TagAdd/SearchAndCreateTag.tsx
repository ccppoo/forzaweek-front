import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type {
  ArrayPath,
  FieldArray,
  FieldArrayPath,
  FieldArrayPathValue,
  FieldArrayWithId,
  FieldPath,
  PathValue,
} from 'react-hook-form';

import { Paper, Typography } from '@mui/material';

import type { TagItemPopulated, TagName } from '@/FormData/tag/search/types';
import type { TaggingItemForm } from '@/FormData/tag/tagging';
import { TagItemCell } from '@/components/Tag';
import NewTagItemCell from '@/components/Tag/NewTagCell';
import { FlexBox, Image } from '@/components/styled';

import TagSearchCreateTextFeild from './TagSearchCreateTextField';

type TagDepenednt = 'decal' | 'tuning' | 'taggableComment';

type SelectCarFormInput = {
  selectScope: string;
  postType: TagDepenednt;
};

// NOTE: src\components\FormInputs\AddTags.tsx 이거 복제본
export default function SearchAndCreateTag(props: SelectCarFormInput) {
  const { selectScope, postType } = props;

  const { setValue, getValues, watch, control, trigger } = useFormContext<TaggingItemForm>();
  const newTagsFormPath = 'newTags' as FieldArrayPath<TaggingItemForm>;
  const tagsFormPath = 'tags' as FieldArrayPath<TaggingItemForm>;
  const tagsFormPath2 = 'tags' as FieldPath<TaggingItemForm>;
  type FormDataType = FieldArray<TaggingItemForm, FieldArrayPath<TaggingItemForm>>;
  type TagItemForm = TagItemPopulated &
    FieldArrayWithId<TaggingItemForm, ArrayPath<TaggingItemForm>, 'customID'>;
  type ArrayPathFormValue = FieldArrayPathValue<TaggingItemForm, FieldArrayPath<TaggingItemForm>>;
  // const [tagsAdded, setTagsAdded] = useState<TagItemPopulated[]>([]) // temp

  const {
    fields: _tagsField,
    remove: removeTag,
    append: appendTag,
  } = useFieldArray({
    control,
    name: tagsFormPath,
    keyName: 'customID',
  });

  const tagsField = _tagsField as TagItemForm[]; // 이렇게까지 type casting을 해야하나??

  const addTag = (tag: TagItemPopulated) => {
    appendTag(tag as TagItemForm);
  };

  const deleteAddedTag = (tagIndex: number) => {
    removeTag(tagIndex);
  };

  console.log(`tagsField : ${JSON.stringify(getValues(tagsFormPath2))}`);

  const tagsAdded = tagsField.length > 0;
  // const tagsAdded = tagsField.length > 0 || newTagsField.length > 0;

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
      <TagSearchCreateTextFeild addTag={addTag} tagsAdded={tagsField} />
      <Paper sx={{ backgroundColor: 'EEEEEE', paddingX: 1, paddingY: 1, minHeight: 64 }}>
        {tagsAdded ? (
          <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1, rowGap: 1 }}>
            {tagsField.map((tag, idx) => {
              const isNewTag = tag.id == tag.name.unknown;
              console.log(`tag aaaaaaa : ${JSON.stringify(tag)}`);
              console.log(`isNewTag  :${isNewTag}`);
              return (
                <TagItemCell
                  tagID={tag.id}
                  newTag={isNewTag}
                  key={tag.customID}
                  onClickDelete={() => deleteAddedTag(idx)}
                />
              );
            })}
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

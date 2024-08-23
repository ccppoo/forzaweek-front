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
import type {
  NewTagAddSchema,
  NewTagDependent,
  TagDependent,
  TagItemSchema,
} from '@/FormData/tag/tagAdd';
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
export default function SearchAndCreateTag<T extends TagDependent & NewTagDependent>(
  props: SelectCarFormInput,
) {
  const { selectScope, postType } = props;

  const { setValue, getValues, watch, control } = useFormContext<T>();
  const newTagsFormPath = 'newTags' as FieldArrayPath<T>;
  const tagsFormPath = 'tags' as FieldArrayPath<T>;
  const tagsFormPath2 = 'tags' as FieldPath<T>;
  type FormDataType = FieldArray<T, FieldArrayPath<T>>;
  type TagItemForm = TagItemPopulated & FieldArrayWithId<T, ArrayPath<T>, 'customID'>;
  // type NewTagsItem = NewTagAddSchema & FieldArrayWithId<T, ArrayPath<T>, 'customID'>;
  type ArrayPathFormValue = FieldArrayPathValue<T, FieldArrayPath<T>>;
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

  const {
    fields: _newTagsField,
    remove: removeNewTag,
    append: appendNewTag,
  } = useFieldArray({
    control,
    name: newTagsFormPath,
    keyName: 'customID',
  });

  // const newTagsField = _newTagsField as NewTagsItem[]; // 이렇게까지 type casting을 해야하나??

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
      <TagSearchCreateTextFeild<T> addTag={addTag} tagsAdded={tagsField} />
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

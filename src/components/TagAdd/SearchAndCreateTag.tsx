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

import type { TagDependentCreation } from '@/FormData/post/tag';
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
  type TagsItem = TagItemSchema & FieldArrayWithId<T, ArrayPath<T>, 'customID'>;
  type NewTagsItem = NewTagAddSchema & FieldArrayWithId<T, ArrayPath<T>, 'customID'>;
  type ArrayPathFormValue = FieldArrayPathValue<T, FieldArrayPath<T>>;
  const {
    fields: _tagsField,
    remove: removeTag,
    append: appendTag,
  } = useFieldArray({
    control,
    name: tagsFormPath,
    keyName: 'customID',
  });

  const tagsField = _tagsField as TagsItem[]; // 이렇게까지 type casting을 해야하나??

  const {
    fields: _newTagsField,
    remove: removeNewTag,
    append: appendNewTag,
  } = useFieldArray({
    control,
    name: newTagsFormPath,
    keyName: 'customID',
  });

  const newTagsField = _newTagsField as NewTagsItem[]; // 이렇게까지 type casting을 해야하나??

  const addTag = (tagID: string) => {
    appendTag({ id: tagID } as FormDataType);
  };

  const addNewTag = (name: string) => {
    appendNewTag({ name: name } as FormDataType);
  };
  const deleteAddedTag = (tagIndex: number) => {
    removeTag(tagIndex);
  };

  const deleteAddedNewTag = (tagIndex: number) => {
    removeNewTag(tagIndex);
  };

  console.log(`tagsField : ${JSON.stringify(getValues(tagsFormPath2))}`);

  const tagsAdded = tagsField.length > 0 || newTagsField.length > 0;

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
      <TagSearchCreateTextFeild<T> addTag={addTag} addNewTag={addNewTag} />
      <Paper sx={{ backgroundColor: 'EEEEEE', paddingX: 1, paddingY: 1, minHeight: 64 }}>
        {tagsAdded ? (
          <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1, rowGap: 1 }}>
            {tagsField.map((tag, idx) => {
              console.log(`tag aaaaaaa : ${JSON.stringify(tag)}`);
              return (
                <TagItemCell
                  tagID={tag.id}
                  key={tag.customID}
                  onClickDelete={() => deleteAddedTag(idx)}
                />
              );
            })}
            {newTagsField.map((newTag, idx) => {
              console.log(`newTag  : ${JSON.stringify(newTag)}`);
              return (
                <NewTagItemCell
                  name={newTag.name}
                  key={newTag.customID}
                  onClickDelete={() => deleteAddedNewTag(idx)}
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

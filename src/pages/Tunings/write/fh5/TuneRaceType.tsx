import { ChangeEvent, FocusEvent, useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type {
  ArrayPath,
  FieldArray,
  FieldArrayPath,
  FieldArrayPathValue,
  FieldPath,
  Path,
  PathValue,
} from 'react-hook-form';

import { Button, Paper, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useQuery } from '@tanstack/react-query';

import { GetTagByID2 } from '@/api/tag/tag';
import { FlexBox } from '@/components/styled';
import type { TuningBulkWriteType } from '@/schema/fh5/tuning/bulkWrite';
import type { Tags } from '@/schema/tag';
import type { Tag } from '@/schema/tag';

interface BasicTagCheckboxIntf {
  tagID: string;
  addTag: (tagID: string) => void;
  removeTag: (tagID: string) => void;
}

function BasicTagCheckbox(props: BasicTagCheckboxIntf) {
  const { tagID, addTag, removeTag } = props;

  const [checked, setChecked] = useState<boolean>(false);

  const onCheckClick = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      addTag(tagID);
    }
    if (!event.target.checked) {
      removeTag(tagID);
    }
  };

  const { data: tag } = useQuery({
    queryKey: ['get tag', tagID],
    queryFn: GetTagByID2,
  });
  if (tag) {
    return (
      <FlexBox sx={{ width: '33%' }}>
        <FormControlLabel
          sx={{ color: tag.color }}
          label={tag.name.en}
          control={<Checkbox checked={checked} onChange={onCheckClick} />}
        />
      </FlexBox>
    );
  }
}

export function TuneSelectRaceType<T extends Tags>() {
  const { getValues, setValue } = useFormContext<T>();
  const formPath = `tags` as FieldPath<T>;
  type formPathValue = PathValue<T, Path<T>>;
  // const formArrayPath = `tags` as ArrayPath<T>;

  // const {append, remove, } = useFieldArray<T, ArrayPath<T>, 'tagArrID'>({control, name:formArrayPath, keyName:'tagArrID' })

  // 66ec324b1b1ae28833c54fb1 - acceleration
  // 66ec32de1b1ae28833c54fb8 - all round
  // 66ec33401b1ae28833c54fbf - grip

  // 66ec33d11b1ae28833c54fc6 - road
  // 66ec33f91b1ae28833c54fcd - off road
  // 66ec342f1b1ae28833c54fd4 - cross country

  const basicTagIDs = [
    '66ec33d11b1ae28833c54fc6',
    '66ec33f91b1ae28833c54fcd',
    '66ec342f1b1ae28833c54fd4',
    '66ec32de1b1ae28833c54fb8',
    '66ec324b1b1ae28833c54fb1',
    '66ec33401b1ae28833c54fbf',
  ];

  const addTag = (tagID: string) => {
    const tags = getValues(formPath);
    setValue(formPath, [...tags, tagID] as formPathValue);
  };

  const removeTag = (tagID: string) => {
    const tags = getValues(formPath) as string[];
    setValue(formPath, tags.filter((_tagID) => _tagID != tagID) as formPathValue);
  };

  return (
    <FlexBox sx={{ flexWrap: 'wrap' }}>
      {basicTagIDs.map((tagID, idx) => {
        return (
          <BasicTagCheckbox
            tagID={tagID}
            key={`basic-tag-${tagID}`}
            removeTag={removeTag}
            addTag={addTag}
          />
        );
      })}
    </FlexBox>
  );
}

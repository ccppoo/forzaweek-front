import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import { Box, Button, MenuItem, Paper, Typography } from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import type { TagItem } from '@/FormData/tag/tag';
import { AddNewTagCategory } from '@/api/tag/category';
import { AddNewTag, EditTag, GetAllTag } from '@/api/tag/tag';
import AddSingleImage from '@/components/FormInputs/AddSingleImage';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';
import { tagCategoryDefault } from '@/schema/tag/category';
import type { TagCategory, TagCategoryInput } from '@/schema/tag/types';

import { InputTagColor } from './TagColor';
import { InputTagDescriptions } from './TagDescription';
import { InputTagName } from './TagName';

interface dataTextInputIntf {
  tagCategory?: TagCategory;
}

export default function TagCategoryEditor(props: dataTextInputIntf) {
  const { tagCategory } = props;
  const methods = useForm<TagCategory>({
    values: tagCategory,
    defaultValues: tagCategoryDefault,
  });

  const isEditMode = !!methods.getValues('id');

  const submit = async (data: TagCategory) => {
    console.log(`data : ${JSON.stringify(data)}`);
    await AddNewTagCategory({ tagCategory: data });
  };

  const handleOnError = (errors: SubmitErrorHandler<TagItem>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  const values = methods.getValues();

  console.log(`values : ${JSON.stringify(values)}`);
  return (
    <FlexBox sx={{ flexDirection: 'column', paddingX: 2 }}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={methods.handleSubmit(submit)}>
          <FlexBox sx={{ flexDirection: 'column', rowGap: 3 }}>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Tag Category Image
              </Typography>
              <AddSingleImage maxHeight={200} />
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Tag Category Name
              </Typography>
              <InputTagName />
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Tag Category Color
              </Typography>
              <FlexBox sx={{ width: 300 }}>
                <InputTagColor label="Tag Category Name Color" />
              </FlexBox>
            </FlexBox>
            {/* 태그 설명 */}
            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Tag Category Description
              </Typography>
              <InputTagDescriptions />
            </FlexBox>
            {/* 태그 병합 */}
          </FlexBox>

          <FlexBox sx={{ justifyContent: 'end', paddingTop: 2, paddingBottom: 1, columnGap: 2 }}>
            <Button onClick={() => {}} variant="outlined" color="warning">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </FlexBox>
        </form>
      </FormProvider>
    </FlexBox>
  );
}

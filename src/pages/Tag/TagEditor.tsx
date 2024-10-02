import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import { Box, Button, MenuItem, Paper, Typography } from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import type { TagItem } from '@/FormData/tag/tag';
import { GetDefaultTagCategory } from '@/api/tag/category';
import { AddNewTag } from '@/api/tag/tag';
import AddSingleImage from '@/components/FormInputs/AddSingleImage';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';
import type { Tag, TagInput } from '@/schema/tag';
import { tagDefault } from '@/schema/tag';

import { SelectTagCategory } from './TagCategory';
import { InputTagColor } from './TagColor';
import { InputTagDescriptions } from './TagDescription';
import { InputTagName } from './TagName';

interface dataTextInputIntf {
  tag?: Tag;
}

export default function TagEditor(props: dataTextInputIntf) {
  const { tag } = props;

  const methods = useForm<Tag>({
    defaultValues: tag || tagDefault,
  });

  const { data: generalTagCategory, isLoading } = useQuery({
    queryKey: ['search general cat'],
    queryFn: GetDefaultTagCategory,
    staleTime: Infinity,
  });
  const isEditMode = !!methods.getValues('id');

  const submit = async (data: TagItem) => {
    console.log(`data : ${JSON.stringify(data)}`);
    if (isEditMode) {
    }
    if (!isEditMode) {
      await AddNewTag({ tag: data });
    }
  };

  const handleOnError = (errors: SubmitErrorHandler<TagItem>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };
  // const values = methods.getValues();

  // console.log(`values : ${JSON.stringify(values)}`);
  return (
    <FlexBox sx={{ flexDirection: 'column', paddingX: 2 }}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={methods.handleSubmit(submit)}>
          <FlexBox sx={{ flexDirection: 'column', rowGap: 3 }}>
            {/* 태그 카테고리 선택 */}
            <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Select Tag Category
              </Typography>
              {generalTagCategory && <SelectTagCategory generalCat={generalTagCategory} />}
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Add Tag Image
              </Typography>
              <AddSingleImage maxHeight={200} />
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Tag Name
              </Typography>
              <InputTagName />
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Tag Color
              </Typography>
              <FlexBox sx={{ width: 300 }}>
                <InputTagColor label="Tag Name Color" />
              </FlexBox>
            </FlexBox>
            {/* 태그 설명 */}
            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Tag Description
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

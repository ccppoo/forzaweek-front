import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues, FieldPath, FieldValues, PathValue } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import type { TaggingItemForm } from '@/FormData/tag/tagging';
import { updatePersonalTagging } from '@/api/tag/tagging/crud';

// export const tagCommentSchema = z.object({
//   id: z.optional(z.string()),
//   tagIDs: z.array(z.string()).default([]), // 이미 있는 태그의 경우 ID로 저장
// });

interface PostFormProviderPropsIntf {
  data: DefaultValues<TaggingItemForm>;
  children: React.ReactNode;
  topic: string;
  subjectID: string;
  id_token: string;
}

export default function TagCommentFormProvider(props: PostFormProviderPropsIntf) {
  const { data, children, topic, subjectID, id_token } = props;
  const methods = useForm<TaggingItemForm>({
    defaultValues: data,
  });

  const commentID = methods.getValues('id' as FieldPath<TaggingItemForm>);
  const isEditMode = !!commentID;
  // console.log(`methods.getValues('id') : ${methods.getValues('id')}`);

  const submit = async () => {
    const tags = methods.getValues() as unknown as TaggingItemForm;
    console.log(`data : ${JSON.stringify(tags)}`);
    await updatePersonalTagging({ id_token, topic, subjectID, tags });

    // NOTE: 태그 보낼때
    /**
     * "tags": [
        {
            "id": "668fd0fce5ff03a8fe22eb48"
        } ...
        ]
        이거 tags : ["668fd0fce5ff03a8fe22eb48", ... ]
        string[] 형태로 변환해서 보내기
     */
    return;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
        {children}
      </form>
    </FormProvider>
  );
}

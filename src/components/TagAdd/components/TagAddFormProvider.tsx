import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues, FieldPath, FieldValues, PathValue } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { outputSchema, outputSchemaDefault } from '@/FormData/editorjs';
import type { OutputSchemaType, PostEditSchemaType } from '@/FormData/editorjs';
import type { TagCommentSchema } from '@/FormData/tag/tagAdd';
// import { createBoardPost2 } from '@/api/board/post/create';
// import { editBoardPost, getBoardPostEdit } from '@/api/board/post/edit';
import EditorEditmode from '@/components/Editor/Editor';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

// export const tagCommentSchema = z.object({
//   id: z.optional(z.string()),
//   tagIDs: z.array(z.string()).default([]), // 이미 있는 태그의 경우 ID로 저장
//   newTags: z.optional(z.array(newTagAddSchema)), // 작성 중에 새롭게 만드는 태그의 경우에만 있음
// });

interface PostFormProviderPropsIntf<T> {
  data: DefaultValues<T>;
  children: React.ReactNode;
}

export default function TagCommentFormProvider<T extends FieldValues>(
  props: PostFormProviderPropsIntf<T>,
) {
  const { data, children } = props;
  const methods = useForm<T>({
    defaultValues: data,
  });

  const [auth, state, action] = useAuthState();
  const commentID = methods.getValues('id' as FieldPath<T>);
  const isEditMode = !!commentID;
  // console.log(`methods.getValues('id') : ${methods.getValues('id')}`);

  const submit = async () => {
    const allValues = methods.getValues();
    console.log(`data : ${JSON.stringify(allValues)}`);

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
    if (isEditMode) {
      console.log(`tag comment edit`);

      // await editBoardPost({ token: auth.id_token, data: allValues, postID: postID });
      //   await EditDecal({ decal: data });
      //   return;
    }
    if (!isEditMode) {
      console.log(`new tag comment add submit`);
      // await createBoardPost2<T>({ token: auth.id_token, data: allValues });
      //   await AddNewTrack({ track: data });
    }
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

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues, FieldPath, FieldValues, PathValue } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { outputSchema, outputSchemaDefault } from '@/FormData/editorjs';
import type { OutputSchemaType, PostEditSchemaType } from '@/FormData/editorjs';
// import { createBoardPost2 } from '@/api/board/post/create';
// import { editBoardPost, getBoardPostEdit } from '@/api/board/post/edit';
import EditorEditmode from '@/components/Editor/Editor';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

interface PostFormProviderPropsIntf<T> {
  data: DefaultValues<T>;
  children: React.ReactNode;
}

export default function TagInstantCreateFormProvider<T extends FieldValues>(
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
    if (isEditMode) {
      // await editBoardPost({ token: auth.id_token, data: allValues, postID: postID });
      //   await EditDecal({ decal: data });
      //   return;
    }
    if (!isEditMode) {
      // await createBoardPost2<T>({ token: auth.id_token, data: allValues });
      //   await AddNewTrack({ track: data });
    }
    return;
  };
  const _stopBubble = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    await methods.handleSubmit(submit);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => _stopBubble(e)} style={{ width: '100%' }}>
        {children}
      </form>
    </FormProvider>
  );
}

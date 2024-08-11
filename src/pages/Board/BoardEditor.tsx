import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

// import type { OutputData } from '@editorjs/editorjs';
import { outputSchema, outputSchemaDefault } from '@/FormData/editorjs';
import type { OutputSchemaType } from '@/FormData/editorjs';
import { xbox } from '@/api/auth/oauth';
import { createBoardPost } from '@/api/board/post/create';
import EditorContainer from '@/components/Editor';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { db } from '@/db';
import useAuthState from '@/store/auth';

import Title from './components/Title';

// NOTE: 게시글 외에도 OutputData 하고 추가로 관리할 데이터들
// 1. 수정하는 경우 -> 이미지 삭제시 최종 POST 할 때 삭제할 이미지 첨부하기

const a = {
  comments: 0,
  data: {
    time: 1723350228790,
    blocks: [
      { id: '9ctES4OmUn', type: 'header', data: { text: 'New note title...', level: 3 } },
      { id: 'FiZ0OGsxDi', type: 'paragraph', data: { text: '' } },
    ],
    version: '2.30.2',
  },
  title: 'aasaaaaaaaaaaaaaaaaaaaaaaaa',
};

export default function BoardEditor() {
  const [auth, state, action] = useAuthState();

  const methods = useForm<OutputSchemaType>({
    defaultValues: outputSchemaDefault,
  });

  const isEditMode = !!methods.getValues('id');

  const submit = async () => {
    const allValues = methods.getValues();
    console.log(`data : ${JSON.stringify(allValues)}`);
    await createBoardPost({ token: auth.id_token, data: allValues });
    if (isEditMode) {
      //   await EditDecal({ decal: data });
      //   return;
    }
    if (!isEditMode) {
      //   await AddNewTrack({ track: data });
    }
    return;
  };

  const onClickSubmitButton = () => {
    const a = methods.getValues('data');
    const allValues = methods.getValues();
    console.log(`data : ${JSON.stringify(allValues)}`);
    if (!a) return;
    console.log(JSON.stringify(a));
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 10,
        width: '100%',
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
          <FlexBox sx={{ flexDirection: 'column' }}>
            {/* 게시판 종류 */}

            {/* 제목 쓰는 곳 */}
            <Title<OutputSchemaType> />
            {/* 본문 */}
            <EditorContainer<OutputSchemaType> />
            <FlexBox
              sx={{ width: '100%', border: '1px black solid', justifyContent: 'end', padding: 2 }}
            >
              <Button variant="contained" type="submit">
                submit
              </Button>
            </FlexBox>
          </FlexBox>
        </form>
      </FormProvider>
    </Container>
  );
}

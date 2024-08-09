import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

// import type { OutputData } from '@editorjs/editorjs';
import { outputSchema } from '@/FormData/editorjs';
import type { OutputSchemaType } from '@/FormData/editorjs';
import { xbox } from '@/api/auth/oauth';
import EditorContainer from '@/components/Editor';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { db } from '@/db';
import useAuthState from '@/store/auth';

// NOTE: 게시글 외에도 OutputData 하고 추가로 관리할 데이터들
// 1. 수정하는 경우 -> 이미지 삭제시 최종 POST 할 때 삭제할 이미지 첨부하기

function FreeBoard() {
  // const methods = useForm<TrackEditSchema_FH5>({
  //   defaultValues: editSchema || trackEditSchemaDefault,
  //   mode: 'onChange',
  // });
  // const isEditMode = !!methods.getValues('id');
  // const submit = async (data: TrackEditSchema_FH5) => {
  //   console.log(`data : ${JSON.stringify(data)}`);

  //   // if (isEditMode) {
  //   //   await EditDecal({ decal: data });
  //   //   return;
  //   // }
  //   if (!isEditMode) {
  //     await AddNewTrack({ track: data });
  //   }
  //   return;
  // };
  const [auth, state, action] = useAuthState();

  const methods = useForm<OutputSchemaType>();

  const submit = async (data: OutputSchemaType) => {
    console.log(`data : ${JSON.stringify(data)}`);

    // if (isEditMode) {
    //   await EditDecal({ decal: data });
    //   return;
    // }
    // if (!isEditMode) {
    //   await AddNewTrack({ track: data });
    // }
    return;
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', paddingTop: 10, width: '100%' }}>
      {/* 게시판 종류 */}

      {/* 제목 쓰는 곳 */}

      {/* 본문 */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
          <EditorContainer />
        </form>
      </FormProvider>
    </Container>
  );
}

export default FreeBoard;

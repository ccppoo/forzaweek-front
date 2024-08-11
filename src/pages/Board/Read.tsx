import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

import { useQuery } from '@tanstack/react-query';

// import type { OutputData } from '@editorjs/editorjs';
import { outputSchema, outputSchemaDefault } from '@/FormData/editorjs';
import type { OutputSchemaType } from '@/FormData/editorjs';
import { xbox } from '@/api/auth/oauth';
import { createBoardPost } from '@/api/board/post/create';
import { readBoardPost } from '@/api/board/post/read';
import EditorContainer from '@/components/Editor';
import EditorReader from '@/components/Editor/EditorReader';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { db } from '@/db';
import useAuthState from '@/store/auth';

import Title from './components/Title';

// NOTE: 게시글 외에도 OutputData 하고 추가로 관리할 데이터들
// 1. 수정하는 경우 -> 이미지 삭제시 최종 POST 할 때 삭제할 이미지 첨부하기

export default function BoardRead() {
  // const [auth, state, action] = useAuthState();
  const { postID } = useParams();

  const { data } = useQuery({
    queryKey: ['post read', postID!],
    queryFn: readBoardPost,
  });

  if (data) {
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
        <FlexBox sx={{ flexDirection: 'column' }}>
          {/* 게시판 종류 */}

          {/* 제목  */}
          <Typography>{data.title}</Typography>
          {/* 본문 */}
          <EditorReader data={data} />
        </FlexBox>
      </Container>
    );
  }
}

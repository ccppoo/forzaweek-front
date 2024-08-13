import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';

import { outputSchema, outputSchemaDefault } from '@/FormData/editorjs';
import type { OutputSchemaType, PostEditSchemaType } from '@/FormData/editorjs';
import { getBoardPostEdit } from '@/api/board/post/edit';
import { EditorEditmode } from '@/components/Editor';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

import PostFormProvider from './components/PostFormProvider';
import Title from './components/Title';

// NOTE:  이 Component는 글 쓰기, 수정 모두 사용될 수 있음

type EditPathParam = { postID: string | undefined };

export default function BoardPostEditor() {
  const [auth, state, action] = useAuthState();
  const { postID } = useParams<EditPathParam>();
  // postID 있으면 편집모드
  // console.log(`postID: ${postID}`);

  const queryEnabled = !!auth.id_token && !!postID;
  // console.log(`queryEnabled : ${queryEnabled}`);
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['edit post', postID!],
    queryFn: getBoardPostEdit,
    enabled: queryEnabled,
    // staleTime: Infinity,
  });

  // console.log(`queryEnabled : ${queryEnabled}`);
  // TODO: 좀 더 깔끔한 방법??+
  if (queryEnabled) {
    if (data) {
      // console.log(`data :${JSON.stringify(data)}`);
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
          <PostFormProvider<OutputSchemaType> data={data}>
            <FlexBox sx={{ flexDirection: 'column' }}>
              {/* 게시판 종류 */}
              {/* 제목 쓰는 곳 */}
              <Title<OutputSchemaType> editMode={queryEnabled} />
              {/* 본문 */}
              <EditorEditmode<OutputSchemaType> editMode={queryEnabled} />
              <FlexBox
                sx={{ width: '100%', border: '1px black solid', justifyContent: 'end', padding: 2 }}
              >
                <Button variant="contained" type="submit">
                  submit
                </Button>
              </FlexBox>
            </FlexBox>
          </PostFormProvider>
        </Container>
      );
    }
    return;
  }

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
      <PostFormProvider<OutputSchemaType> data={outputSchemaDefault}>
        <FlexBox sx={{ flexDirection: 'column' }}>
          {/* 게시판 종류 */}
          {/* 제목 쓰는 곳 */}
          <Title<OutputSchemaType> />
          {/* 본문 */}
          <EditorEditmode<OutputSchemaType> editMode={queryEnabled} />
          <FlexBox
            sx={{ width: '100%', border: '1px black solid', justifyContent: 'end', padding: 2 }}
          >
            <Button variant="contained" type="submit">
              submit
            </Button>
          </FlexBox>
        </FlexBox>
      </PostFormProvider>
    </Container>
  );
}

import { useContext, useRef, useState } from 'react';

import Button from '@mui/material/Button';

import { MinHeightTextarea } from '@/components/TextArea';
import { FlexBox } from '@/components/styled';

import { CommentContext } from '../context';

export default function CommentCreateTextArea({ placeHolder }: { placeHolder: string }) {
  const { commentReadOptions } = useContext(CommentContext);

  // 여기서 댓글, 대댓글 작성 후 axios POST 보내기
  // commentReadOptions.subject_id -> 이걸로 POST 엔드포인트 만들어서 요청 보내기

  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        paddingY: 0.2,
        paddingX: 0.1,
        borderRadius: 2,
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <MinHeightTextarea width={'100%'} placeholder={placeHolder} />
      {/* TODO: cancel, comment(submit) button */}
      <FlexBox sx={{ justifyContent: 'end', paddingY: 0.3 }}>
        <FlexBox sx={{ columnGap: 1 }}>
          <Button color="warning" variant="outlined" size="small" sx={{ borderRadius: 3 }}>
            cancel
          </Button>
          <Button color="success" variant="outlined" size="small" sx={{ borderRadius: 3 }}>
            reply
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

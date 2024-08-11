import { useEffect, useMemo, useRef, useState } from 'react';

import { Box, Button, Paper } from '@mui/material';

import EditorJS from '@editorjs/editorjs';
import type { BlockMovedEvent, EditorConfig } from '@editorjs/editorjs';

import useAuthState from '@/store/auth';

import { FlexBox } from '../styled';
import { getEditorReaderConfig } from './config';
import './editor.css';
import type { OutputData, onChangeEditorJS } from './types';

interface EditorBaseIntf {
  data: OutputData;
}

export const EditorBaseReader = (props: EditorBaseIntf): JSX.Element => {
  const { data } = props;

  const ejInstance = useRef<EditorJS | null>(null);

  const defaultHolder = 'editorjs-container';

  const createEditor = (configs: EditorConfig): EditorJS => {
    const editor = new EditorJS(configs);
    return editor;
  };

  const editorConfig: EditorConfig = getEditorReaderConfig({
    holder: defaultHolder,
    data: data,
  });

  useEffect(() => {
    if (ejInstance.current) return;
    if (!ejInstance.current) {
      const editor = createEditor({
        ...editorConfig,
        hideToolbar: false,
        // tunes: ['image'],
      });
      ejInstance.current = editor;
    }
    // 아래 호출하는 거는 deps가 바뀌어서 새로운 글을 불러올 때
    // 예를 들어서 Parent Component에서 (수정하는 경우) 새로운 글을 API로부터 불러 올 때
    // onReady : true -> false로 바뀌는 경우 기존에 있던 에디터 삭제하고 새로운 내용 불러옴
    // TODO: 지금 있단 tool 불러오고 UI 이쁘게 잘 나오는거 확인 된 이후에 할 것
    // return (): void => {
    //   ejInstance?.current && ejInstance?.current?.destroy();
    //   ejInstance.current = null;
    // };
  }, []);

  return (
    <Box
      id={defaultHolder}
      sx={{
        width: '100%',
        marginTop: 1,
        marginBottom: 0,
      }}
    />
  );
};

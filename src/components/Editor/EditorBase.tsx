import { useEffect, useMemo, useRef, useState } from 'react';

import { Box, Button, Paper } from '@mui/material';

import EditorJS, { API, BlockMutationEvent } from '@editorjs/editorjs';
import type { BlockMovedEvent, EditorConfig } from '@editorjs/editorjs';
// @ts-ignore
import DragDrop from 'editorjs-drag-drop';

import * as editorjs from '@/FormData/editorjs';
import boardImageAPI from '@/api/image';
import useAuthState from '@/store/auth';

import { FlexBox } from '../styled';
import getEditorConfig from './config';
import './editor.css';
import type { OutputData, onChangeEditorJS } from './types';

type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

const DEFAULT_INITIAL_DATA: OutputData = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'New note title...',
        level: 1,
      },
    },
  ],
};

interface EditorBaseIntf {
  imageUpload?: boolean;
  readOnly?: boolean;
  onBlockChange: (blockEvent: BlockMutationEvent) => void;
}

export const EditorBase = (props: EditorBaseIntf): JSX.Element => {
  const { imageUpload, readOnly, onBlockChange } = props;
  const [auth] = useAuthState();

  const ejInstance = useRef<EditorJS | null>(null);
  const date = new Date();
  const dateString = date.toLocaleDateString();

  const defaultHolder = 'editorjs-container';
  const defaultBlock: string = 'paragraph';

  const createEditor = (configs: EditorConfig): EditorJS => {
    const editor = new EditorJS(configs);
    return editor;
  };

  const [outputData, setOutputData] = useState<OutputData | undefined>(DEFAULT_INITIAL_DATA);

  const onChange: onChangeEditorJS = async (
    api: API,
    event: EditorJSOnChangeEvent,
  ): Promise<void> => {
    const isMultiBlockEvent = Array.isArray(event);
    // multiblock의 기준은 비동기적 fire됨 : 빠르게 block을 생성하거나 조작할 경우
    // 변화가 버퍼에 쌓인 후 -> MultiBlock으로 처리된다.
    // console.log(`isMultiBlockEvent : ${isMultiBlockEvent}`);
    if (isMultiBlockEvent) event.map((event) => onBlockChange(event));
    if (!isMultiBlockEvent) onBlockChange(event);

    const content = await ejInstance.current?.save();
    setOutputData(content);
  };

  const handleReady = () => {
    ejInstance.current = new DragDrop(ejInstance.current);
  };

  const imageUploader = useMemo(
    () => boardImageAPI.getBoardCreate.imageUploader(auth.id_token!),
    [auth.id_token!],
  );

  // NOTE: 글 새로 작성하는 경우에는 이거 써야됨 -> 임시 이미지 파일 바로 삭제하는 용도
  const imageRemover = useMemo(
    () => boardImageAPI.getBoardCreate.imageRemover(auth.id_token!),
    [auth.id_token!],
  );

  // NOTE: 글 수정하는 경우에는 이거 써야됨
  const imageRemoverOnEdit = (imageURL: string) => {
    const originImageURL = new URL(imageURL);
    // TODO: form에 삭제할 사진들 리스트에 저장하기
    originImageURL.pathname;
  };

  const editorConfig: EditorConfig = getEditorConfig({
    onReady: handleReady,
    onChange: onChange,
    defaultBlock: defaultBlock,
    holder: defaultHolder,
    data: DEFAULT_INITIAL_DATA,
    uploadByFile: imageUploader,
    removeImageFromBlock: imageRemover,
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

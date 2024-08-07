import { useEffect, useMemo, useRef, useState } from 'react';

import { Box, Button, Paper } from '@mui/material';

import EditorJS, { API, BlockMutationEvent } from '@editorjs/editorjs';
import type { EditorConfig } from '@editorjs/editorjs';
// @ts-ignore
import DragDrop from 'editorjs-drag-drop';

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
}

export const EditorBase = (props: EditorBaseIntf): JSX.Element => {
  const { imageUpload } = props;
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
    // BlockMutationEvent => BlockAddedEvent, BlockRemovedEvent, BlockMovedEvent, BlockChangedEvent
    const isMultiBlockEvent = Array.isArray(event);

    // event.type= block-added, block-changed, block-moved, block-removed(drag&drop의 경우 제자리 이동해도 trigger됨)
    // event.detail= BlockAddedEventDetail, BlockRemovedEventDetail, BlockMovedEventDetail,  BlockChangedEventDetail
    if (isMultiBlockEvent) {
      // multiblock의 기준은 비동기적으로 측정되기 때문에
      // 빠르게 block을 생성하거나 조작할 경우 하나의 block에 대한 조작이 있을 경우에도
      // 변화가 버퍼에 쌓인 후 -> MultiBlock으로 처리된다.
      // (event as BlockMutationEvent[]).map((event_) => {
      //   console.log(`event_.type : ${event_.type}`);
      // });
    }
    if (!isMultiBlockEvent) {
      // event.detail.target.
      const target_id = event.detail.target.id;
      // event.detail.target.holder.outerText -> 실제 입력한 내용 볼 수 있는 것
      // console.log(event.detail.target.holder.textContent);
      // const blockAPI = api.blocks.getById(target_id);
    }

    // api;

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

  const imageRemover = useMemo(
    () => boardImageAPI.getBoardCreate.imageRemover(auth.id_token!),
    [auth.id_token!],
  );

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

  const onClickButton = () => {
    console.log(JSON.stringify(outputData));
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          height: 'fit-content',
          flexGrow: 1,
          minWidth: 800,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Box
          id={defaultHolder}
          sx={{
            width: '100%',
            marginTop: 1,
            marginBottom: 0,
          }}
        />
      </Paper>
      <FlexBox sx={{ border: '1px black solid', justifyContent: 'end', padding: 2 }}>
        {/* <Box sx={{ border: '1px black solid', paddingX: 2 }}> */}
        <Button variant="contained" onClick={onClickButton}>
          submit
        </Button>
        {/* </Box> */}
      </FlexBox>
    </FlexBox>
  );
};

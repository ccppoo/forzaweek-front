import { useEffect, useMemo, useRef, useState } from 'react';

import { Box, Button, Paper } from '@mui/material';

import EditorJS, { API, BlockMutationEvent } from '@editorjs/editorjs';
import type { BlockMovedEvent, EditorConfig } from '@editorjs/editorjs';

// @ts-ignore
// import DragDrop from 'editorjs-drag-drop';
import * as editorjs from '@/FormData/editorjs';
import boardImageAPI from '@/api/image';
import type {
  BoardImageUploadType,
  RemoveBoardImageType,
  UploadByFileType,
} from '@/components/Editor/types';
import { FlexBox } from '@/components/styled';

import getEditorConfig from '../config';
import '../editor.css';
import '../editor_edit.css';
import type { OutputData, onChangeEditorJS } from '../types';

type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

interface EditorBaseIntf {
  readOnly?: boolean;
  data: OutputData;
  onChange?: onChangeEditorJS;
  imageUploader?: UploadByFileType;
  imageRemover?: RemoveBoardImageType;
}

const EditorBase = (props: EditorBaseIntf): JSX.Element => {
  const { readOnly, onChange: _onChange, data, imageUploader, imageRemover } = props;

  const ejInstance = useRef<EditorJS | null>(null);
  const [editorReady, setEditorReady] = useState<boolean>(false);
  const defaultHolder = 'editorjs-container';
  const defaultBlock: string = 'paragraph';

  const createEditor = (configs: EditorConfig): EditorJS => {
    const editor = new EditorJS(configs);
    return editor;
  };

  const dummyOnChange = async (api: API, event: EditorJSOnChangeEvent) => {};

  const handleReady = () => {
    // ejInstance.current = new DragDrop(ejInstance.current);
    setEditorReady(true);
  };

  useEffect(() => {
    // if (ejInstance.current) return;
    if (!ejInstance.current) {
      const editorConfig: EditorConfig = getEditorConfig({
        onReady: () => {
          // console.log(`asdasdasdasdasdasd`);
          // ejInstance.current = ejInstance.currentnew DragDrop(ejInstance.current);
          setEditorReady(true);
        }, // base에서
        defaultBlock: defaultBlock, // base에서
        holder: defaultHolder, // base에서
        onChange: !!_onChange ? _onChange : dummyOnChange, // container에서
        data: data, // container에서
        uploadByFile: imageUploader, // container에서
        removeImageFromBlock: imageRemover, // container에서
      });

      const editor = createEditor({
        ...editorConfig,
        hideToolbar: false,
        readOnly: readOnly,
        // tunes: ['image'],
      });
      ejInstance.current = editor;
    }
    // 아래 호출하는 거는 deps가 바뀌어서 새로운 글을 불러올 때
    // 예를 들어서 Parent Component에서 (수정하는 경우) 새로운 글을 API로부터 불러 올 때
    // onReady : true -> false로 바뀌는 경우 기존에 있던 에디터 삭제하고 새로운 내용 불러옴
    // TODO: 지금 있단 tool 불러오고 UI 이쁘게 잘 나오는거 확인 된 이후에 할 것
    return (): void => {
      if (ejInstance.current && ejInstance.current.destroy) {
        console.log(`destroy!!!!!!!!!!!`);
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
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

export default EditorBase;

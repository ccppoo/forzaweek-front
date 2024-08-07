import { API, BlockMutationEvent } from '@editorjs/editorjs';
import type { EditorConfig, ToolboxConfig } from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';

type BoardImageUploadType = {
  success: number;
  file: {
    url: string;
  };
};

type UploadByFileType = (file: File) => Promise<BoardImageUploadType>;
type RemoveBoardImageType = (image_url: string) => void; // axios 요청은 then...catch 형식으로 동기형태로 만듦

type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

type onChangeEditorJS = (api: API, event: EditorJSOnChangeEvent) => Promise<void>;

export type {
  BlockMutationEvent,
  EditorJSOnChangeEvent,
  onChangeEditorJS,
  OutputData,
  ToolConstructable,
  ToolSettings,
  EditorConfig,
  ToolboxConfig,
  BoardImageUploadType,
  UploadByFileType,
  RemoveBoardImageType,
};

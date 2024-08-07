import type { EditorConfig, ToolboxConfig } from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';

import type {
  BoardImageUploadType,
  RemoveBoardImageType,
  UploadByFileType,
} from '@/components/Editor/types';

import type { onChangeEditorJS } from '../types';
import { embedTools, getImageTools } from './mediaTools';
import basicEditorTools from './tools';

interface EditorConfigIntf {
  holder: string;
  data: OutputData;
  defaultBlock: string;
  embedAllow?: boolean;
  uploadByFile?: UploadByFileType;
  removeImageFromBlock?: RemoveBoardImageType;
  onChange: onChangeEditorJS;
  onReady: () => void;
}

const getEditorConfig: (props: EditorConfigIntf) => EditorConfig = (props: EditorConfigIntf) => {
  // 이미지 업로드 가능한 게시물의 경우 이 2개가 모두 있어야 함 uploadByFile, removeImageFromBlock
  const { uploadByFile, removeImageFromBlock, embedAllow, ...rest } = props;

  const imageSupported = uploadByFile && removeImageFromBlock;

  const tempImageRemover = (image_url: string) => {
    console.log(`image_url : ${image_url}`);
  };
  const _imageTool = !!imageSupported
    ? getImageTools(uploadByFile, removeImageFromBlock)
    : undefined;
  return {
    ...rest,
    tools: {
      ...basicEditorTools,
      image: _imageTool,
    },
  } as unknown as EditorConfig;
};

export default getEditorConfig;

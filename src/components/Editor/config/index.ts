import type { EditorConfig, ToolboxConfig } from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';

import type { onChangeEditorJS } from '../types';
import { embedTools, imageTools } from './mediaTools';
import basicEditorTools from './tools';

interface EditorConfigIntf {
  holder: string;
  data: OutputData;
  defaultBlock: string;
  imageUpload?: boolean;
  embedAllow?: boolean;
  onChange: onChangeEditorJS;
  onReady: () => void;
}

const getEditorConfig: (props: EditorConfigIntf) => EditorConfig = (props: EditorConfigIntf) => {
  const { imageUpload, embedAllow, ...rest } = props;

  // console.log(`imageUpload : ${imageUpload}`);
  // console.log(`embedAllow : ${embedAllow}`);
  return {
    ...rest,
    tools: {
      ...basicEditorTools,
      image: !!imageUpload ? imageTools : undefined,
    },
  } as unknown as EditorConfig;
};

export default getEditorConfig;

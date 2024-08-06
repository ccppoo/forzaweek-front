import { BlockToolConstructable } from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';
import Embed from '@editorjs/embed';

const embedTool = {
  class: Embed,
  inlineToolbar: true,
  config: {
    services: {
      youtube: true,
    },
  },
};

export default embedTool;

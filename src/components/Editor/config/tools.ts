import { BlockToolConstructable } from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import NestedList from '@editorjs/nested-list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Underline from '@editorjs/underline';

import { LimitedNestedList } from './customTools';

const headerTools: ToolSettings = {
  class: Header as unknown as BlockToolConstructable,
  config: {
    placeholder: 'Enter a header',
    levels: [2, 3, 4],
    defaultLevel: 3,
  },
  inlineToolbar: true,
};

const qouteTools: ToolSettings = {
  class: Quote,
  inlineToolbar: true,
  // shortcut: 'CMD+SHIFT+O',
  config: {
    quotePlaceholder: 'Enter a quote',
    captionPlaceholder: "Quote's author",
  },
};

const paragraphTool = {
  class: Paragraph,
  inlineToolbar: true,
  config: {
    preserveBlank: true,
  },
};

// max nest level : 3 (e.g : 1.1.1, 1.2.3, ...)
const nestedListTool = {
  class: LimitedNestedList,
  inlineToolbar: true,
  config: {
    defaultStyle: 'ordered',
    maxDepth: 2,
  },
};

const basicEditorTools = {
  header: headerTools,
  paragraph: paragraphTool,
  list: nestedListTool,
  qoute: qouteTools,
  underline: Underline,
} as const;

export default basicEditorTools;

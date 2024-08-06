import { API, BlockMutationEvent } from '@editorjs/editorjs';
import type { EditorConfig, ToolboxConfig } from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';

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
};

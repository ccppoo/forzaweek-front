import { useState } from 'react';

import { Box, Button, Paper } from '@mui/material';

import { API, BlockMutationEvent } from '@editorjs/editorjs';
import type {
  BlockAddedEvent,
  BlockChangedEvent,
  BlockMovedEvent,
  BlockRemovedEvent,
} from '@editorjs/editorjs';

import { outputSchema } from '@/FormData/editorjs';
import type {
  OutputBlockDataType,
  OutputDataSchemaType,
  OutputSchemaType,
} from '@/FormData/editorjs';
import { EditorBaseReader } from '@/components/Editor/EditorBaseReader';

import { FlexBox } from '../styled';
import type { OutputData, onChangeEditorJS } from './types';

// type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

type MutationEventType = 'block-added' | 'block-changed' | 'block-moved' | 'block-removed';
type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

export default function EditorReader({ data }: { data: OutputDataSchemaType }) {
  // const { setValue, getValues, control, trigger } = useFormContext<T>();
  // type FormDataType = PathValue<T, FieldPath<T>>;
  // const outputDataFormPath = 'data' as FieldPath<T>; // 글 쓴 내용 저장되는 form-path
  // // getValues(outputDataFormPath)
  // const data = getValues(outputDataFormPath);

  const onChange: onChangeEditorJS = async (api: API, event: EditorJSOnChangeEvent) => {
    // const target_id = blockEvent.detail.target.id;
    // const isMultiBlockEvent = Array.isArray(event);
    // if (isMultiBlockEvent) event.map((event) => dispatchChangeEvent(event));
    // if (!isMultiBlockEvent) dispatchChangeEvent(event);
    // const content = await api.saver.save();
    // saveOnChange(content as FormDataType);
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 2, alignItems: 'center', minWidth: 800 }}>
      <Paper
        sx={{
          display: 'flex',
          height: 'fit-content',
          flexGrow: 1,
          minWidth: 800,
          maxWidth: 900,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <EditorBaseReader data={data.data} />
      </Paper>
    </FlexBox>
  );
}

import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type {
  ArrayPath,
  FieldArrayPath,
  FieldArrayWithId,
  FieldPath,
  PathValue,
} from 'react-hook-form';

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
import { EditorBase } from '@/components/Editor';

import { FlexBox } from '../styled';
import type { OutputData, onChangeEditorJS } from './types';

// type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

type MutationEventType = 'block-added' | 'block-changed' | 'block-moved' | 'block-removed';
type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

export default function EditorContainer<T extends OutputDataSchemaType>() {
  const { setValue, getValues, control, trigger } = useFormContext<T>();
  type FormDataType = PathValue<T, FieldPath<T>>;
  const outputDataFormPath = 'data' as FieldPath<T>; // 글 쓴 내용 저장되는 form-path
  // getValues(outputDataFormPath)
  const data = getValues(outputDataFormPath);

  const saveOnChange = (value: FormDataType) => {
    setValue(outputDataFormPath, value);
  };

  const onChange: onChangeEditorJS = async (api: API, event: EditorJSOnChangeEvent) => {
    // const target_id = blockEvent.detail.target.id;
    const isMultiBlockEvent = Array.isArray(event);
    if (isMultiBlockEvent) event.map((event) => dispatchChangeEvent(event));
    if (!isMultiBlockEvent) dispatchChangeEvent(event);
    const content = await api.saver.save();
    saveOnChange(content as FormDataType);
  };

  const dispatchChangeEvent = (mutationEvent: BlockMutationEvent) => {
    switch (mutationEvent.type as MutationEventType) {
      case 'block-added': {
        onBlockAdded(mutationEvent as BlockAddedEvent);
        return;
      }
      case 'block-changed': {
        onBlockChanged(mutationEvent as BlockChangedEvent);
        return;
      }
      case 'block-moved': {
        onBlockMoved(mutationEvent as BlockMovedEvent);
        return;
      }
      case 'block-removed': {
        onBlockRemoved(mutationEvent as BlockRemovedEvent);
        return;
      }
    }
  };

  const onBlockAdded = (blockAddEvent: BlockAddedEvent) => {};
  const onBlockChanged = (blockChangeEvent: BlockChangedEvent) => {
    // console.log(`blockChangeEvent.detail : ${JSON.stringify(blockChangeEvent.detail)}`);
    // blockChangeEvent.detail.index
  };
  const onBlockMoved = (blockMoveEvent: BlockMovedEvent) => {
    // NOTE: block moved event는 한 번에 하나씩 됨
    // (drag&drop의 경우 제자리 이동해도 trigger됨)
    blockMoveEvent.detail; //  {"target":{},"fromIndex":4,"toIndex":0}
    // TODO: field array 변경
  };
  const onBlockRemoved = (blockRemoveEvent: BlockRemovedEvent) => {
    // 블럭 삭제
  };

  const onClickSubmitButton = () => {
    // if (!outputData) return;
    // console.log(JSON.stringify(outputData));
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
        <EditorBase imageUpload onChange={onChange} data={data} />
      </Paper>
    </FlexBox>
  );
}

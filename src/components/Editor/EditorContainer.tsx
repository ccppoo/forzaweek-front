import { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { ArrayPath, FieldArrayPath, FieldArrayWithId, FieldPath } from 'react-hook-form';

import { Box, Button, Paper } from '@mui/material';

import { API, BlockMutationEvent } from '@editorjs/editorjs';
import type {
  BlockAddedEvent,
  BlockChangedEvent,
  BlockMovedEvent,
  BlockRemovedEvent,
} from '@editorjs/editorjs';

import { outputSchema } from '@/FormData/editorjs';
import type { OutputBlockDataType, OutputSchemaType } from '@/FormData/editorjs';
import { EditorBase } from '@/components/Editor';

import { FlexBox } from '../styled';

// type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

type MutationEventType = 'block-added' | 'block-changed' | 'block-moved' | 'block-removed';

export default function EditorContainer<T>() {
  // const { setValue, getValues, control, trigger } = useFormContext<T>();
  const methods = useFormContext<OutputSchemaType>();

  // useFieldArray()
  const formPath = 'post_data.blocks' as FieldArrayPath<OutputSchemaType>;

  const { fields: blocks } = useFieldArray({
    control: methods.control,
    name: formPath,
  });

  const onBlockChange = (mutationEvent: BlockMutationEvent) => {
    // const target_id = blockEvent.detail.target.id;
    // methods.setValue('post_data')
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
  const onBlockChanged = (blockChangeEvent: BlockChangedEvent) => {};
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
        <EditorBase imageUpload onBlockChange={onBlockChange} />
      </Paper>
      <FlexBox sx={{ width: '100%', border: '1px black solid', justifyContent: 'end', padding: 2 }}>
        <Box sx={{ border: '1px black solid', paddingX: 2 }}>
          <Button variant="contained" onClick={onClickSubmitButton}>
            submit
          </Button>
        </Box>
      </FlexBox>
    </FlexBox>
  );
}

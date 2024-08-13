import { useState } from 'react';

import { Box, Button, Paper } from '@mui/material';

import type {
  OutputBlockDataType,
  OutputDataSchemaType,
  OutputSchemaType,
} from '@/FormData/editorjs';

import { FlexBox } from '../styled';
import EditorBase from './base/EditorBase';
import type { OutputData, onChangeEditorJS } from './types';

export default function EditorReader({ data }: { data: OutputDataSchemaType }) {
  return (
    <Paper
      sx={{
        display: 'flex',
        height: 'fit-content',
        alignItems: 'center',
        flexGrow: 1,
        minWidth: 800,
        maxWidth: 900,
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <EditorBase data={data.data} readOnly />
    </Paper>
  );
}

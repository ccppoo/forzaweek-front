import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FieldArrayPath, FieldPath, PathValue } from 'react-hook-form';

import { Box, Button, Paper } from '@mui/material';

import { API, BlockMutationEvent } from '@editorjs/editorjs';

import { outputSchema } from '@/FormData/editorjs';
import type {
  OutputBlockDataType,
  OutputDataSchemaType,
  OutputSchemaType,
  PostEditSchemaType,
} from '@/FormData/editorjs';
import boardImageAPI from '@/api/image';
import { API_IMAGE_UPLOAD_HOST } from '@/api/index';
import useAuthState from '@/store/auth';

import { FlexBox } from '../styled';
import EditorBase from './base/EditorBase';
import dispatchChangeEvent from './config/eventHandlers';
import type { onChangeEditorJS } from './types';

type EditorJSOnChangeEvent = BlockMutationEvent | BlockMutationEvent[];

interface EditorContainerIntf {
  editMode: boolean;
}

export default function EditorEditmode<T extends OutputDataSchemaType & PostEditSchemaType>(
  props: EditorContainerIntf,
) {
  const { editMode } = props;
  const [auth] = useAuthState();
  const { setValue, getValues, control } = useFormContext<T>();
  type FormDataType = PathValue<T, FieldPath<T>>;
  const outputDataFormPath = 'data' as FieldPath<T>; // 글 쓴 내용 저장되는 form-path
  const blockUpdateDeletesFormPath = 'imageDelete' as FieldArrayPath<T>;

  const {
    fields: imagesPendingDelete,
    append: appendImageToDelete,
    remove: restoreImageToDelete,
  } = useFieldArray({
    control,
    name: blockUpdateDeletesFormPath,
  });

  const data = getValues(outputDataFormPath);

  const saveOnChange = (value: FormDataType) => {
    setValue(outputDataFormPath, value);
  };

  const onChange: onChangeEditorJS = async (api: API, event: EditorJSOnChangeEvent) => {
    // const target_id = blockEvent.detail.target.id;
    const isMultiBlockEvent = Array.isArray(event);
    if (isMultiBlockEvent) event.map((event) => dispatchChangeEvent(api, event));
    if (!isMultiBlockEvent) dispatchChangeEvent(api, event);
    const content = await api.saver.save();
    saveOnChange(content as FormDataType);
  };

  const imageUploader = useMemo(
    () => boardImageAPI.getBoardCreate.imageUploader(auth.id_token!),
    [auth.id_token!],
  );

  // NOTE: 글 새로 작성하는 경우에는 이거 써야됨 -> 임시 이미지 파일 바로 삭제하는 용도
  const imageRemover = useMemo(() => {
    // console.log(`editMode :${editMode}`);
    const remover = boardImageAPI.getBoardCreate.imageRemover(auth.id_token!);
    if (editMode) {
      return (imageURL: string): void => {
        const notUploaded = imageURL.startsWith(`${API_IMAGE_UPLOAD_HOST}/user/upload`);
        if (!notUploaded) {
          appendImageToDelete({ url: imageURL } as FormDataType);
          // TODO: restore image on edit (images pending to delete)
          // console.log(`imagesPendingDelete : ${JSON.stringify(imagesPendingDelete)}`);
        }

        notUploaded && remover(imageURL);
      };
    }
    return remover;
  }, [editMode, auth.id_token!]);

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
        <EditorBase
          onChange={onChange}
          data={data}
          imageRemover={imageRemover}
          imageUploader={imageUploader}
        />
      </Paper>
    </FlexBox>
  );
}

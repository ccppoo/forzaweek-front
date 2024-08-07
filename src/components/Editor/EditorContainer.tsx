import { useFormContext } from 'react-hook-form';

import { EditorBase } from '@/components/Editor';

import { FlexBox } from '../styled';

export default function EditorContainer<T>() {
  // const { setValue, getValues, control, trigger } = useFormContext<T>();

  return (
    <FlexBox>
      <EditorBase imageUpload />
    </FlexBox>
  );
}

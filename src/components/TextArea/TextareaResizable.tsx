import * as React from 'react';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import type { TextareaAutosizeProps } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

interface TextAreaProps {
  placeholder?: string | undefined;
  width?: string | number | undefined;
}

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  width : 100%;
  resize: vertical;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  border: 0px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: 0px 0px 0px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    // border-color: ${blue[400]};
  }

  &:focus {
    // border-color: ${blue[400]};
    // box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export default function MinHeightTextarea(props: TextAreaProps) {
  const [textValue, setTextValue] = React.useState<string>('');

  const { width, ...resProps } = props;

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <Textarea
      aria-label="minimum height"
      minRows={1}
      // sx={{ width: width }}
      style={{ width: '100%' }}
      {...props}
      value={textValue}
      onChange={onTextChange}
    />
  );
}

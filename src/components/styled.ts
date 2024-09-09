import { Link } from 'react-router-dom';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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
const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});
const Image = styled('img')({
  width: '100%',
  height: '100%',
  margin: 0,
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const TextArea = styled(BaseTextareaAutosize)(
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  position: relative;
  padding: 2px 6px 2px 6px;
  border-radius: 4px;
  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
  }
`;

export {
  FlexBox,
  CenteredFlexBox,
  FullSizeCenteredFlexBox,
  Image,
  VisuallyHiddenInput,
  StyledLink,
  TextArea,
};

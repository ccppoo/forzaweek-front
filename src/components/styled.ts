import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox, Image, VisuallyHiddenInput };

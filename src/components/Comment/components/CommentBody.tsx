import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';

export default function CommentBody({ value }: { value: string }) {
  return (
    <FlexBox sx={{ alignItems: 'center', columnGap: 1, gridColumn: '2 / 3', gridRow: '1/2' }}>
      <Typography variant="body1">{value}</Typography>
    </FlexBox>
  );
}

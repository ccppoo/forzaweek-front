import { useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

const SAMPLE_TAGs = ['F1', 'Hyundai', 'WRC Hyundai', 'NASCAR', 'MONSTER', 'Off-road'];

function Tag() {
  return (
    <Container>
      <Typography>tags</Typography>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ flexDirection: 'column', paddingY: 2 }}>
          <Typography variant="h6">Recently Added</Typography>
          <FlexBox sx={{ columnGap: 1 }}>
            {SAMPLE_TAGs.map((val) => {
              return (
                <FlexBox
                  sx={{
                    borderRadius: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    paddingX: 1,
                    paddingY: 0.5,
                  }}
                >
                  <Typography>{val}</Typography>
                </FlexBox>
              );
            })}
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column', paddingY: 2 }}>
          <Typography variant="h6">Recently Updated</Typography>
          <FlexBox sx={{ columnGap: 1 }}>
            {SAMPLE_TAGs.map((val) => {
              return (
                <FlexBox
                  sx={{
                    borderRadius: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    paddingX: 1,
                    paddingY: 0.5,
                  }}
                >
                  <Typography>{val}</Typography>
                </FlexBox>
              );
            })}
          </FlexBox>
        </FlexBox>

        <FlexBox
          sx={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Paper
            sx={{
              display: 'flex',
              width: 800,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FlexBox
              sx={{
                width: '80%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px black solid',
                borderRadius: 2,
              }}
            >
              <FlexBox
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  columnGap: 2,
                  // height: 40,
                  width: '100%',
                  paddingX: 3,
                }}
              >
                <SearchOutlinedIcon />
                <TextField InputProps={{ sx: { height: 40 } }} fullWidth placeholder="search tag" />
              </FlexBox>
            </FlexBox>
          </Paper>
        </FlexBox>
      </FlexBox>
    </Container>
  );
}

export default Tag;

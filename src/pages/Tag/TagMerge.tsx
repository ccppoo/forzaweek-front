import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Button, MenuItem, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';

import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';

export function SelectTagCategory() {
  return (
    <TextField
      select
      fullWidth
      label="Select"
      defaultValue={methods.getValues('mergedTo') || ''}
      inputProps={methods.register('mergedTo', {})}
      error={!!methods.formState.errors.mergedTo}
      helperText={methods.formState.errors.mergedTo?.message}
      SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
      size="small"
    >
      {mergeTagCandidate.map((tag) => (
        <MenuItem key={`${tag.name_en}-${tag.id}`} value={tag.id}>
          <FlexBox>
            {/* <Box sx={{ height: 40, width: 60 }}>
        <Image src={tag.imageURL} sx={{ objectFit: 'contain' }} />
      </Box> */}
            <Paper
              sx={{
                height: 40,
                width: 'fit-content',
                paddingX: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>{tag.kind.name_en}</Typography>
            </Paper>
            <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
              <Typography>{tag.name_en}</Typography>
            </FlexBox>
          </FlexBox>
        </MenuItem>
      ))}
    </TextField>
  );
}

import * as React from 'react';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { FieldArrayPath, FieldPath } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Checkbox, Chip, List, MenuItem, Paper, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

import type { TagCategoryReadOnly, TagItem } from '@/FormData/tag/tag';
import { tagCategory, tagItem } from '@/FormData/tag/tag';
import { GetAllTagCategory } from '@/api/tag/category';
import { FlexBox, Image, TextArea } from '@/components/styled';
import { tagKindGeneralID } from '@/config/api';
import { supportLangs } from '@/config/i18n';
import type { SupportLang } from '@/config/i18n';

import TagInstantCreateFormProvider from './TagInstantCreateForm';

type CloseReason = 'backdropClick' | 'escapeKeyDown';

function SelectTagKind() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TagItem>();
  const [open, setOpen] = useState(false);

  const [tagKind, setTagKind] = useState<TagCategoryReadOnly | null>(null);
  const [inputValue, setInputValue] = useState<string>(''); // 이거는 값이 확정되지 않은 단순 string

  const { data: tagKindList, isFetching } = useQuery({
    queryKey: ['all tag kind'],
    queryFn: GetAllTagCategory,
  });
  const tagKindFieldPath = `kind` as FieldPath<TagItem>;

  console.log(`errors.kind : ${errors.kind}`);
  return (
    <Autocomplete
      id="tag kind select "
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name.en}
      options={tagKindList || []}
      onChange={(event: any, newValue: TagCategoryReadOnly | null) => {
        setTagKind(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      loading={isFetching}
      renderInput={(params) => (
        <TextField
          {...params}
          {...register(tagKindFieldPath, { required: true })}
          // label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          error={errors.kind && !!errors.kind}
          helperText={errors.kind && !!errors.kind && 'you must provide tag category'}
        />
      )}
    />
  );
}

export default function TagCreateDialog({
  newTagInitName,
  opened,
  onClose,
}: {
  newTagInitName: string;
  opened: boolean;
  onClose: (newTagId: string) => void;
}) {
  const handleCloseDialog = (event: object, reason: CloseReason) => {
    if (reason && reason === 'backdropClick') return;
  };

  const handleDialogCloseButton = () => {};

  const closeDialog = () => {
    const tempNewTagId = 'asd';
    onClose(tempNewTagId);
  };

  // 언어에 따라서 탭 이동
  const [value, setValue] = useState<SupportLang>('en');
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TagItem>();

  type i18nFieldPath = FieldArrayPath<TagItem>;

  const { fields: tagNames } = useFieldArray({
    control,
    name: 'name',
  });

  const { fields: tagDescriptions } = useFieldArray({
    control,
    name: 'description',
  });

  const handleChange = (event: React.SyntheticEvent, newValue: SupportLang) => {
    setValue(newValue);
  };

  const TextFieldName = ({ fieldLang }: { fieldLang: SupportLang }) => {
    const fieldIndex = tagNames.findIndex(({ lang }) => lang == fieldLang);
    const fieldPath = `name.${fieldIndex}.value` as i18nFieldPath;
    return (
      <TextField
        {...register(fieldPath, { required: false })}
        defaultValue={''}
        size="small"
        fullWidth
        error={errors.name && !!errors.name[fieldIndex]?.value}
        helperText={errors.name && errors.name[fieldIndex] && 'you must provide value'}
      />
    );
  };

  const TextFieldDescription = ({ fieldLang }: { fieldLang: SupportLang }) => {
    const fieldIndex = tagDescriptions.findIndex(({ lang }) => lang == fieldLang);
    const fieldPath = `description.${fieldIndex}.value` as i18nFieldPath;

    // TODO: remove line brake sequence : \n\n\n\n
    return (
      <FlexBox
        sx={{
          width: '100%',
          border: '1px black solid',
          paddingY: 0.2,
          paddingX: 0.1,
          borderRadius: 2,
        }}
      >
        <TextArea
          aria-label="minimum height"
          minRows={2}
          maxRows={5}
          maxLength={1200}
          {...register(fieldPath, { required: false })}
          style={{ width: '100%', maxHeight: 125 }}
        />
      </FlexBox>
      // <TextField
      //   {...register(fieldPath, { required: false })}
      //   defaultValue={''}
      //   size="small"
      //   fullWidth
      //   error={errors.description && !!errors.description[fieldIndex]?.value}
      //   helperText={
      //     errors.description && errors.description[fieldIndex] && 'you must provide value'
      //   }
      // />
    );
  };
  const tagCreateTitle = 'Add new tag';

  return (
    <TagInstantCreateFormProvider<TagItem> data={tagItem}>
      <Dialog
        open={opened}
        onClose={handleCloseDialog}
        maxWidth={'xl'}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            // event.preventDefault();
            console.log(`on submit`);
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries((formData as any).entries());
            // const email = formJson.email;
            // console.log(email);
            // handleClose();
          },
        }}
      >
        <DialogTitle>{tagCreateTitle}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ minWidth: 600, minHeight: 400 }}>
          {/* select tag kind  */}
          <FlexBox sx={{ paddingBottom: 2, flexDirection: 'column', rowGap: 2 }}>
            <Typography>Tag Category</Typography>
            <SelectTagKind />
          </FlexBox>

          <Typography>Tag name and description</Typography>
          <Box sx={{ width: '100%' }} component={Paper}>
            <TabContext value={value}>
              <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {supportLangs.map((val) => (
                    <Tab label={val} value={val} key={`tag-create-i18n-tab-${val}`} />
                  ))}
                </TabList>
              </Box>
              {supportLangs.map((val, index) => (
                <TabPanel value={val} key={`tag-create-i18n-${val}`}>
                  {/* i18n - name, description */}
                  <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
                    <FlexBox sx={{ alignItems: 'center' }}>
                      <FlexBox sx={{ minWidth: 100 }}>
                        <Typography>Name</Typography>
                      </FlexBox>
                      <TextFieldName fieldLang={val as SupportLang} />
                    </FlexBox>
                    <FlexBox sx={{}}>
                      <FlexBox
                        sx={{
                          minWidth: 100,
                          // height: '100%',
                          minHeight: 40,
                          flexDirection: 'column',
                          alignItems: 'start',
                          justifyContent: 'start',
                        }}
                      >
                        <Typography>Description</Typography>
                      </FlexBox>
                      <TextFieldDescription fieldLang={val as SupportLang} />
                    </FlexBox>
                  </FlexBox>
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseButton} color="error" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create and Add new tag
          </Button>
        </DialogActions>
      </Dialog>
    </TagInstantCreateFormProvider>
  );
}

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Paper, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useQuery } from '@tanstack/react-query';

import type { CarSchemaType, FH5CarMetaSchemaType } from '@/FormData/car';
import { GetAllCar } from '@/api/data/car';
import DeleteItemPopUp from '@/components/Dialogs/DeletePopUp';
import { ImageShowHorizontal } from '@/components/ImageList';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function CarRealDetail({ name, value }: { name: string; value: string }) {
  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2">{name}</Typography>
      <Divider variant="middle" flexItem sx={{ marginY: '3px' }} />
      <Typography fontWeight={600}>{value}</Typography>
    </FlexBox>
  );
}

function CarFH5Meta({ fh5_meta }: { fh5_meta: FH5CarMetaSchemaType }) {
  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
      <FlexBox>
        <Typography>Forza Horizon 5</Typography>
      </FlexBox>
      <FlexBox sx={{ columnGap: 1 }}>
        <FlexBox sx={{ flexDirection: 'column', flex: 1 }}>
          <Typography variant="body1">division</Typography>
          <Typography variant="h6">{fh5_meta.division}</Typography>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column', flex: 1 }}>
          <Typography variant="body1">rarity</Typography>
          <Typography variant="h6">{fh5_meta.rarity}</Typography>
          {fh5_meta.boost && (
            <>
              <Typography variant="body2" fontWeight={300}>
                boost
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {fh5_meta.boost}
              </Typography>
            </>
          )}
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column', flex: 1 }}>
          <Typography variant="body1">value</Typography>
          <Typography variant="h6">{fh5_meta.value.toLocaleString()} CR</Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function CarItemMoreImagesDialog({
  opened,
  carName,
  imageURLs,
  onClose,
}: {
  opened: boolean;
  carName: string;
  imageURLs: string[];
  onClose: () => void;
}) {
  type CloseReason = 'backdropClick' | 'escapeKeyDown';
  const handleClose = (event: object, reason: CloseReason) => {
    onClose();
    // if (reason && reason === 'backdropClick') return;
  };

  return (
    <Dialog open={opened} onClose={handleClose} maxWidth={'xl'}>
      <DialogTitle>{carName}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <ImageShowHorizontal images={imageURLs} />
    </Dialog>
  );
}

function CarItemCell({ carData }: { carData: CarSchemaType }) {
  const DATA_TYPE = 'car';

  const navigate = useNavigate();

  const [deletePopUpOpened, setDeletePopUpOpened] = useState<boolean>(false);

  const closeDeletePopUp = () => {
    setDeletePopUpOpened(false);
  };

  const openDeletePopUp = () => {
    setDeletePopUpOpened(true);
  };

  const [imageModalOpened, setImageModalOpened] = useState<boolean>(false);

  const openImageModal = () => setImageModalOpened(true);
  const closeImageModal = () => setImageModalOpened(false);

  const editItem = (itemID: string) => {
    navigate(`/data/${DATA_TYPE}/edit/${itemID}`);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '50px 150px',
        border: '1px solid black',
      }}
    >
      <FlexBox
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          columnGap: 2,
          paddingLeft: 1,
          paddingRight: 2,
        }}
      >
        <FlexBox sx={{ columnGap: 2 }}>
          <FlexBox sx={{ columnGap: 1, alignItems: 'center' }}>
            <FlexBox sx={{ width: 'fit-content', maxWidth: 120, height: 30 }}>
              <Tooltip title={carData.manufacturer.name_en} arrow placement="top">
                <Image src={carData.manufacturer.imageURL} />
              </Tooltip>
            </FlexBox>
          </FlexBox>
          <FlexBox sx={{ justifyContent: 'start', height: '100%', alignItems: 'center' }}>
            <Tooltip title={carData.short_name_en} arrow placement="top">
              <Typography variant="h6">{carData.name_en}</Typography>
            </Tooltip>
          </FlexBox>
        </FlexBox>

        <FlexBox sx={{ columnGap: 1, alignItems: 'center' }}>
          <Button color="info" variant="outlined" size="small" onClick={() => editItem(carData.id)}>
            Edit
          </Button>
          <Button color="error" variant="outlined" size="small" onClick={openDeletePopUp}>
            Delete
          </Button>
        </FlexBox>
      </FlexBox>
      <DeleteItemPopUp
        opened={deletePopUpOpened}
        onClose={closeDeletePopUp}
        dataType={DATA_TYPE}
        itemID={carData.id}
      />
      <FlexBox sx={{ width: '100%', height: '100%' }}>
        <FlexBox sx={{ height: '100%', flex: 1, flexDirection: 'column' }}>
          <Image src={carData.firstImage} sx={{ objectFit: 'contain' }} />
          <FlexBox sx={{ width: '100%', height: 30, justifyContent: 'end' }}>
            {carData.imageURLs.length - 1 > 1 && (
              <Button size="small" onClick={openImageModal}>
                {carData.imageURLs.length - 1} more images
              </Button>
            )}
          </FlexBox>
          <CarItemMoreImagesDialog
            opened={imageModalOpened}
            carName={carData.name_en}
            imageURLs={carData.imageURLs}
            onClose={closeImageModal}
          />
        </FlexBox>
        <FlexBox sx={{ height: '100%', flex: 3, paddingY: 1 }}>
          <Box
            sx={{
              width: '40%',
              display: 'grid',
              gridTemplateRows: '1fr 1fr',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 1,
            }}
          >
            <CarRealDetail name="Production Year" value={carData.production_year.toString()} />
            <CarRealDetail name="Engine Type" value={carData.engineType} />
            <CarRealDetail name="Body Style" value={carData.bodyStyle} />
            <CarRealDetail name="Doors" value={carData.door.toString()} />
          </Box>

          <FlexBox
            sx={{ width: '60%', flexDirection: 'column', paddingX: 2, justifyContent: 'center' }}
          >
            {carData.fh5 && carData.fh5.meta && <CarFH5Meta fh5_meta={carData.fh5.meta} />}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Box>
  );
}

export default function CarTable() {
  const DATA_TYPE = 'car';

  const navigate = useNavigate();

  // TODO: pagination
  // TODO: delete, edit 한 다음에 다시 부르기
  const { data } = useQuery({
    queryKey: ['get car'],
    queryFn: GetAllCar,
    staleTime: 10,
  });

  const addItem = () => {
    navigate(`/data/${DATA_TYPE}/write`);
  };

  // console.log(`data :  ${JSON.stringify(data)}`);

  if (data) {
    return (
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 2 }}>
        {/* 데이터 추가 버튼 */}
        <FlexBox sx={{ justifyContent: 'end' }}>
          <Button variant="outlined" onClick={addItem}>
            add data
          </Button>
        </FlexBox>
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: 'repeat(auto-fill, 200px)',
            gridTemplateColumns: 'repeat(1, minmax(500px, 1fr))',
            rowGap: 1,
            columnGap: 2,
          }}
        >
          {data.map((cardata) => (
            <CarItemCell carData={cardata} key={`car-item-cell-${cardata.name_en}`} />
          ))}
        </Box>
      </FlexBox>
    );
  }
}

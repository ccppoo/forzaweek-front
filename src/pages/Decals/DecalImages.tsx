import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';

import { GetDecal, GetDecalImageUpload, GetDecalImageUploadIDs } from '@/api/fh5/decal';
import { getUserProfile } from '@/api/user/profile';
import { ImageShowHorizontal } from '@/components/ImageList/Horizontal3';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useAuthState from '@/store/auth';

import { DecalImageUploadActions } from './DecalImagesReaction';

export function DecalImages({ decalID }: { decalID: string }) {
  const { data } = useQuery({
    queryFn: GetDecalImageUploadIDs,
    queryKey: ['get decal', decalID!],
  });
  // DecalImageRead
  console.log(`data : ${JSON.stringify(data)}`);
  if (data) {
    return (
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox>
          <Typography fontWeight={300} variant="h5">
            Decal Images Shared By Users
          </Typography>
        </FlexBox>

        <FlexBox sx={{ flexDirection: 'column', paddingY: 2 }}>
          {data.map((decalImageID) => (
            <DecalImage decalID={decalID} decalImageID={decalImageID} key={decalImageID} />
          ))}
        </FlexBox>
      </FlexBox>
    );
  }
}

function DecalImageUploader({ uploader }: { uploader: string }) {
  const { data } = useQuery({
    queryFn: getUserProfile,
    queryKey: ['user profile', uploader, undefined],
  });

  if (data) {
    return (
      <FlexBox sx={{ columnGap: 1 }}>
        <Typography fontWeight={300}>uploaded by </Typography>
        <Typography>{data.gamerTag}</Typography>
      </FlexBox>
    );
  }

  return <></>;
}

function DecalImage({ decalID, decalImageID }: { decalID: string; decalImageID: string }) {
  const [{ id_token }] = useAuthState();

  const { data } = useQuery({
    queryFn: GetDecalImageUpload,
    queryKey: ['get decal', decalID, decalImageID, id_token],
  });

  if (data) {
    // console.log(`data.images : ${data.images}`);

    return (
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ alignItems: 'center', columnGap: 2 }}>
          <DecalImageUploader uploader={data.uploader} />
          <DecalImageUploadActions decalID={decalID} decalImageID={decalImageID} />
        </FlexBox>
        <ImageShowHorizontal images={data.images} />
      </FlexBox>
    );
  }
  return <></>;
}

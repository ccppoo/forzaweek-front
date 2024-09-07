import { useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import type { TagItemPopulated } from '@/FormData/tag/search/types';
// import { tagItemPopulated } from '@/FormData/tag/search';
// import { populateTagSearchResult } from '@/FormData/tag/utils';
import { dev_check } from '@/api/auth/dev';
import { xbox } from '@/api/auth/oauth';
import { GetCarFH5 } from '@/api/fh5/car/get';
import {
  updateCarDB, // updateCarImage,
  updateCar_FH5,
  updateCar_FH5_Image,
  updateCountryDB,
  updateManufacturerDB,
  updateRaceRouteImage_FH5,
  updateRaceRoute_FH5,
} from '@/api/indexedDB/get';
import { GetRealCar } from '@/api/real/car/get';
import { GetCountry } from '@/api/real/country/get';
import { GetManufacturer } from '@/api/real/manufacturer/get';
// import { EditorJSInput } from '@/components/Editor';
import Meta from '@/components/Meta';
import TagItemCell from '@/components/Tag/TagCell';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { db } from '@/db';
import type { CarFH5Type } from '@/schema/fh5/types';
import type { CarType, CountryType, ManufacturerType } from '@/schema/real/types';
import useAuthState from '@/store/auth';

type APIFunctionType<T> = () => Promise<T>;

function GetAPITest<T>({ name, APIFunction }: { name: string; APIFunction: APIFunctionType<T> }) {
  const [value, setValue] = useState<T | undefined>(undefined);

  const onClick = async () => {
    const apiResult = await APIFunction();
    setValue(apiResult);
  };

  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <FlexBox sx={{ columnGap: 1 }}>
        <Button onClick={onClick} variant="outlined">
          {name}
        </Button>
      </FlexBox>
      <FlexBox sx={{ flexWrap: 'wrap', columnGap: 2, paddingY: 2 }}>
        {JSON.stringify(value)}
      </FlexBox>
    </FlexBox>
  );
}

function Dev() {
  const [msg, setMSG] = useState<string>('');
  const [userAuthMSG, setUserAuthMSG] = useState<string>('');
  const [refreshMSG, setRefreshMSG] = useState<string>('');
  const [auth, state, action] = useAuthState();

  const refresh_token = async () => {
    if (auth && auth.refresh_token) {
      const data = await xbox.TokenRefresh({ refreshToken: auth.refresh_token });
      action.setAuthTokens(data);
      setUserAuthMSG(JSON.stringify(data));
      return;
    }
    setUserAuthMSG(`no refresh token`);
  };

  const insertDB2 = async (table: string) => {
    switch (table) {
      case 'country': {
        await updateCountryDB();
        return;
      }
      case 'manufacturer': {
        await updateManufacturerDB();
        return;
      }
      case 'car': {
        await updateCarDB();
        return;
      }
      case 'car_FH5': {
        await updateCar_FH5();
        return;
      }
      case 'car_FH5_image': {
        await updateCar_FH5_Image();
        return;
      }
      case 'race_route_FH5': {
        await updateRaceRoute_FH5();
        return;
      }
      case 'race_route_FH5_image': {
        await updateRaceRouteImage_FH5();
        return;
      }
    }
  };

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResult, setSearchResult] = useState<TagItemPopulated[]>([]);

  return (
    <>
      <Meta title="Test" />
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 20 }}>
          <FlexBox sx={{ columnGap: 2, rowGap: 4, flexDirection: 'column' }}>
            <FlexBox sx={{ justifyContent: 'center' }}>
              <Typography>update DB</Typography>
            </FlexBox>

            <Grid container sx={{}} rowGap={2}>
              <Grid xs={4} sx={{}}>
                <Button variant="outlined" onClick={() => insertDB2('country')}>
                  country
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('manufacturer')}>
                  manufacturers
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('car')}>
                  cars
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('car_FH5')}>
                  car FH5
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('car_FH5_image')}>
                  car FH5 images
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('race_route_FH5')}>
                  race_route_FH5
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button variant="outlined" onClick={() => insertDB2('race_route_FH5_image')}>
                  race_route_FH5_image
                </Button>
              </Grid>
            </Grid>
          </FlexBox>
          <FlexBox>
            state : <Typography>{msg}</Typography>
          </FlexBox>

          <GetAPITest<CarType> name="get real car" APIFunction={async () => GetRealCar({})} />
          <GetAPITest<ManufacturerType>
            name="get real manufacturer"
            APIFunction={async () => GetManufacturer({})}
          />
          <GetAPITest<CountryType>
            name="get real country"
            APIFunction={async () => GetCountry({})}
          />
          <GetAPITest<CarFH5Type> name="get fh5 car" APIFunction={async () => GetCarFH5({})} />

          <FlexBox sx={{ flexDirection: 'column' }}>
            <Typography>Token refresh</Typography>
            <Button onClick={refresh_token} variant="contained">
              토큰 refresh
            </Button>
            <Typography>returned : {refreshMSG}</Typography>
          </FlexBox>
        </FullSizeCenteredFlexBox>
      </Container>
    </>
  );
}

export default Dev;

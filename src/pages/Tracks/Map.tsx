import {
  ImageOverlay,
  MapContainer,
  Marker,
  SVGOverlay,
  SVGOverlayProps,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';

import zIndex from '@mui/material/styles/zIndex';

import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useTrackSearchFilters from '@/store/trackSearchFilters';
import type { TrackInfo } from '@/types';

import './leaflet.css';
import test2 from './test-2.svg';

interface MapDispalyIntf {
  width: number;
  height: number;
}

function TrackOverlay() {
  const southWest = { lat: -118.75, lng: 90.10416650772095 };
  const northEast = { lat: -110.9375, lng: 105.57291650772095 };
  const bounds = Leaflet.latLngBounds(southWest, northEast);

  const signSouthWest = { lat: -110.71875, lng: 89.51041650772095 };
  const signNorthEast = { lat: -108.4375, lng: 99.38541650772095 };
  const signBounds = Leaflet.latLngBounds(signSouthWest, signNorthEast);

  // Zoom 3 : 트랙 아이콘,
  // Zoom 4 : 트랙 아이콘 + 이름
  // Zoom 5 : 트랙 아이콘 + 이름 + 맵 정보(랩 수, 물/점프/등등..)
  return (
    <>
      <SVGOverlay bounds={signBounds}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" rx="8" />
        <text x="50%" y="50%" stroke="black"></text>
        <text
          x="2"
          y="30"
          // font-family="Verdana"
          fontSize="24"
          fill="black"
        >
          물레헤아치 서킷
        </text>
      </SVGOverlay>
      <ImageOverlay url={test2} bounds={bounds} />
    </>
  );
}

export default function Map(props: MapDispalyIntf) {
  const { width, height } = props;
  const yx = Leaflet.latLng;

  const xy = function (x: number, y: number) {
    if (Array.isArray(x)) {
      // When doing xy([x, y]);
      return yx(x[1], x[0]);
    }
    return yx(y, x); // When doing xy(x, y);
  };
  const mapImageUrl = './map/{z}/{x}/{y}.png';

  const center = { lat: -101.625, lng: 91.16666603088379 };
  const southWest = Leaflet.latLng(-160.51398419181675, 1.010868292262824);
  const northEast = Leaflet.latLng(-1.1943746650783424, 255.6687739857694);
  const maxbounds = Leaflet.latLngBounds(southWest, northEast);

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng);
        console.log(e.target._zoom);
      },
    });
    return null;
  };

  // 전체 원본 사이즈 : 22452x13437
  // 가로 167 세로 100
  // 가로 59.8 세로 100
  return (
    <FlexBox sx={{ width: '100%', height: '100%' }}>
      <MapContainer
        center={center}
        zoom={1}
        // scrollWheelZoom={true}
        minZoom={3}
        maxZoom={5}
        crs={Leaflet.CRS.Simple}
        style={{ width, height }}
        maxBoundsViscosity={3}
        maxBounds={maxbounds}
      >
        <TrackOverlay />
        <TileLayer attribution="its offline" url={mapImageUrl} noWrap={true} />
        <LocationFinderDummy />
      </MapContainer>
    </FlexBox>
  );
}

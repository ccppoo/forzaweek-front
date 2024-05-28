import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
// import type { LatLngExpression} from ''
import { useNavigate } from 'react-router-dom';

import { ImageRounded } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Leaflet from 'leaflet';
// import './leaflet.css';
import 'leaflet/dist/leaflet.css';

import * as image from '@/image';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
// import MapImage from '@/image/map/Horizon5MapFullRes.jpg';
import useTrackSearchFilters from '@/store/trackSearchFilters';
import type { TrackInfo } from '@/types/track';

import { Image } from './styled';

export default function Map() {
  const center = { lat: 46.07323062540835, lng: -23.085936605930332 };
  const mapImageUrl = './map/{z}/{x}/{y}.png';
  // aspectRatio: '167/100'
  const southWest = Leaflet.latLng(-41.11246878918086, -179.58984330296516);
  const northEast = Leaflet.latLng(84.99776961973944, 208.05859419703486);
  const maxbounds = Leaflet.latLngBounds(southWest, northEast);
  const imgBound = [
    [0, 0],
    [22452, 13437],
  ];
  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng);
      },
    });
    return null;
  };

  return (
    <FlexBox sx={{ width: 1336, height: 800 }}>
      <MapContainer
        center={center}
        zoom={3}
        scrollWheelZoom={true}
        minZoom={3}
        maxZoom={5}
        style={{ width: 1336, height: 800 }}
        maxBoundsViscosity={3}
        maxBounds={maxbounds}
      >
        <TileLayer attribution="its offline" url={mapImageUrl} noWrap={true} />
        <LocationFinderDummy />
      </MapContainer>
    </FlexBox>
  );
}

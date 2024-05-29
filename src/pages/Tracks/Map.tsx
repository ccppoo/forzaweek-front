import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useTrackSearchFilters from '@/store/trackSearchFilters';
import type { TrackInfo } from '@/types/track';

import './leaflet.css';
import { Image } from './styled';

export default function Map() {
  const center = { lat: 46.07323062540835, lng: -23.085936605930332 };
  const mapImageUrl = './map/{z}/{x}/{y}.png';
  // aspectRatio: '167/100'
  const southWest = Leaflet.latLng(-41.11246878918086, -180);
  const northEast = Leaflet.latLng(84.99776961973944, 180.35156250000003);
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

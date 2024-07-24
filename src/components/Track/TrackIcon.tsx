import { Image } from '@/components/styled';
import { trackIcons } from '@/image/track_icon';

// export type TrackFormat = 'sprint' | 'trail' | 'course' | 'circuit' | 'scramble';
// export const TrackFormats: TrackFormat[] = ['sprint', 'trail', 'course', 'circuit', 'scramble'];

// export type TrackFormatTopology = 'linear' | 'circular';
// export const TrackFormatTopologies: TrackFormatTopology[] = ['linear', 'circular'];

// export type TrackCategory = 'cross country' | 'rally' | 'off-road' | 'road' | 'street' | 'drag';
// export const TrackCategories: TrackCategory[] = [
//   'cross country',
//   'rally',
//   'off-road',
//   'road',
//   'street',
//   'drag',
// ];

function get_icon(category: string, format?: string) {
  switch (category) {
    case 'road': {
      if (format == 'circuit') {
        return trackIcons.road_track;
      }
      if (format == 'sprint') return trackIcons.road_sprint;
    }
    case 'street': {
      return trackIcons.street_racing;
    }
    case 'drag': {
      return trackIcons.drag_racing;
    }
    case 'offRoad': {
      if (format == 'trail') {
        return trackIcons.offroad_sprint;
      }
      if (format == 'scramble') {
        return trackIcons.offroad_track;
      }
    }
    case 'crossCountry': {
      if (format == 'crossCountryCircuit') {
        return trackIcons.crosscountry_track;
      }
      if (format == 'crossCountry') {
        return trackIcons.crosscountry_sprint;
      }
    }
  }
}

interface TrackGetIconIntf {
  category: string;
  format?: string;
}
export default function TrackIconImage(props: TrackGetIconIntf) {
  const { category, format } = props;

  const trackIcon = get_icon(category, format);

  return (
    <Image
      src={trackIcon}
      sx={{
        objectFit: 'contain',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      }}
    />
  );
}

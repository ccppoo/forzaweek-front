import { DocumentBase } from '@/db/model/base';
import { MultiImageURL } from '@/db/model/image';

export interface Track extends DocumentBase, MultiImageURL {
  // id : string;
  // imageURLs: string[];
  game: string;
  category: string;
  format: string;
  laps: number;
  world: string;
}

// export type Track = {
//   zoom_out: string;
//   zoom_in?: string;
// };

// export interface TrackImage {
//   id?: string; // Track ID
//   first?: string;
//   images: string[];
//   fullPathImage: TrackFullPathImage;
// }

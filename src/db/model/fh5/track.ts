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

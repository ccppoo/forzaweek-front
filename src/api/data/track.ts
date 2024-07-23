import axios from 'axios';

import type { TrackEditSchema } from '@/FormData/tracks/fh5';
import { UploadImage } from '@/api/data/image';
import { API_HOST } from '@/api/index';
import type { API_NAME } from '@/api/types';

export async function AddNewTrack({ track }: { track: TrackEditSchema }) {
  const { value: name_en } = track.name.filter((i18n) => i18n.lang == 'en')[0];
  const { value: name_liberal_translation } = track.liberal_translation.filter(
    (i18n) => i18n.lang == 'en',
  )[0];

  // 1. image Urls
  if (track.imageURLs) {
    const firstImageIdx = track.firstImage ? track.imageURLs.indexOf(track.firstImage) : 0;
    const imageUrls = await Promise.all(
      track.imageURLs.map(async (img) => {
        if (img.startsWith('blob')) {
          return await UploadImage({ folder: 'track', fileBlobURL: img });
        }
        return img;
      }),
    );
    track.imageURLs = imageUrls;
    track.firstImage = imageUrls[firstImageIdx];
  }

  // 2. fullPathImage
  const zo_img = await UploadImage({ folder: 'track', fileBlobURL: track.fullPathImage.zoom_out! });
  const zi_img = !!track.fullPathImage.zoom_in
    ? await UploadImage({ folder: 'track', fileBlobURL: track.fullPathImage.zoom_in! })
    : undefined;

  const data = {
    ...track,
    fullPathImage: {
      zoom_out: zo_img,
      zoom_in: zi_img,
    },
    name_en: name_en,
    liberal_translation: !!name_liberal_translation ? track.liberal_translation : undefined,
  };

  console.log(`처리된 data : ${JSON.stringify(data)}`);

  const path_ = `fh5/track`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { code: resp.status, msg: resp.statusText };
}

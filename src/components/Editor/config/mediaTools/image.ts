import { BlockToolConstructable, ConversionConfig } from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';
import ImageTool from '@editorjs/image';

import { RemoveBoardImage, UploadBoardImage } from '@/api/image';

class CustomImage extends ImageTool {
  async removed() {
    // access the image block's file data
    // @ts-ignore
    const data = this._data;
    console.log(`removed,  : ${JSON.stringify(data)}`);
    if (data.file.url) {
      RemoveBoardImage(data.file.url);
    }
    // const data2 = {
    //   caption: '',
    //   withBorder: false,
    //   withBackground: false,
    //   stretched: false,
    //   file: {
    //     url: 'https://fzwcdn.forzaweek.com/board/board/test/ef238d60-7bc7-443e-bac7-51fd19085601.jpg',
    //   },
    // };
  }

  static get conversionConfig() {
    // NOTE: not working
    return {
      export: undefined,
      import: undefined,
    };
  }
}

const imageTools = {
  class: CustomImage,
  config: {
    uploader: {
      uploadByFile: UploadBoardImage,
    },
    tunes: [''],
  },
};
//  as unknown as ToolConstructable;

export default imageTools;

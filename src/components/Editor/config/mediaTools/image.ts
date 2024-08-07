import { BlockToolConstructable, ConversionConfig } from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import {
  BlockTool,
  BlockToolConstructorOptions,
  PasteConfig,
  PasteEvent,
  ToolboxConfig,
} from '@editorjs/editorjs';
import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools';
import ImageTool from '@editorjs/image';
import type { ImageConfig, ImageToolData } from '@editorjs/image/dist/types/types';

import { RemoveBoardImage, UploadBoardImage } from '@/api/image';
import type {
  BoardImageUploadType,
  RemoveBoardImageType,
  UploadByFileType,
} from '@/components/Editor/types';

// Image의 경우 removed가 호출 될 때
// 게시물 최초 생성시 <-> 게시물 수정시 다르게 호출되어야 함
class ImageCreatePost extends ImageTool {
  removed() {
    // access the image block's file data
    // @ts-ignore
    const data = this._data;
    console.log(`removed,  : ${JSON.stringify(data)}`);
    if (data.file.url) {
      RemoveBoardImage(data.file.url);
    }
  }
}

type ImageRemoverConfig = {
  remover: {
    removedImage: (imageUrl: string) => void;
  };
};
type ExtendedImageConfig = ImageConfig & ImageRemoverConfig;
type ImageToolConstructorOptions = BlockToolConstructorOptions<ImageToolData, ExtendedImageConfig>;

class ImageExtendedTool extends ImageTool {
  removed() {
    // @ts-ignore
    const data = this._data;
    // console.log(`removed,  : ${JSON.stringify(data)}`);
    if (data.file.url) {
      this.removedImage(data.file.url);
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

  constructor({ data, config, api, readOnly, block }: ImageToolConstructorOptions) {
    const { remover } = config;
    super({ data, config, api, readOnly, block });
    this.removedImage = remover.removedImage;
  }

  /**
   * Show preloader and upload image file
   * @param string - file that is currently uploading (from paste)
   */
  private removedImage!: RemoveBoardImageType;
}

const getImageTools = (uploadByFile: UploadByFileType, removeBoardImage: RemoveBoardImageType) => {
  // removeBoardImage 상위 컴포넌트에서 상황에 따라 알아서 제공할 것
  // removeBoardImage -> 게시글 생성/수정에 따라 동작 방식이 다르다
  return {
    class: ImageExtendedTool,
    config: {
      uploader: {
        uploadByFile: uploadByFile,
      },
      remover: {
        removedImage: removeBoardImage,
      },
      tunes: [''],
    },
  };
};
//  as unknown as ToolConstructable;

export default getImageTools;

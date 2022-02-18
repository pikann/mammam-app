import {createThumbnail} from 'react-native-create-thumbnail';

import AxiosClientInstance from '../../../../utils/axios';
import {uploadToS3} from '../../../../utils/uploadS3';

interface Data {
  [key: string]: any;
}

export const postService = async (payload: any) => {
  return await AxiosClientInstance.post('posts', payload);
};

export const updatePostService = async (payload: any) => {
  return await AxiosClientInstance.patch(`posts/${payload._id}`, {
    description: payload.description,
    restaurant: payload.restaurant,
  });
};

export const getPresignedUrlService = async () => {
  return await AxiosClientInstance.get('posts/presigned-url');
};

export const uploadToS3Service = async (payload: any) => {
  const {
    data: {imageUrl: videoUrl, presignedUrl},
  }: Data = await getPresignedUrlService();

  await uploadToS3({
    url: presignedUrl,
    image: payload.video,
    type: payload.videoType,
  });

  return videoUrl;
};

export const uploadThumbnail = async (payload: any) => {
  const response = await createThumbnail({
    url: payload.video,
    timeStamp: Math.max(payload.duration - 2, 0) * 1000,
  });

  return uploadToS3Service({
    video: response.path,
    type: response.mime,
  });
};

import AxiosClientInstance from '../../../../utils/axios';

export const postService = async (payload: any) => {
  return await AxiosClientInstance.post('posts', payload);
};

export const getPresignedUrlService = async () => {
  return await AxiosClientInstance.get('posts/presigned-url');
};

import AxiosClientInstance from '../../../../utils/axios';

export const updateProfileService = async (payload: any) => {
  return await AxiosClientInstance.patch('users/profile', payload);
};

export const getPresignedUrlService = async () => {
  return await AxiosClientInstance.get('posts/presigned-url');
};

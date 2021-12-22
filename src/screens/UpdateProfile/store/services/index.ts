import RNFetchBlob from 'rn-fetch-blob';

import AxiosClientInstance from '../../../../utils/axios';

export const updateProfileService = async (payload: any) => {
  return await AxiosClientInstance.patch('users/profile', payload);
};

export const getPresignedUrlService = async () => {
  return await AxiosClientInstance.get('posts/presigned-url');
};

export const uploadImageService = async (payload: any) => {
  return await RNFetchBlob.fetch(
    'PUT',
    payload.url,
    {'Content-Type': payload.type},
    RNFetchBlob.wrap(payload.image),
  );
};

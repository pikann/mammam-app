import AxiosClientInstance from '../../../../utils/axios';

export const createRestaurantService = async (payload: any) => {
  return await AxiosClientInstance.post('restaurants', payload);
};

export const getPresignedUrlService = async () => {
  return await AxiosClientInstance.get('posts/presigned-url');
};

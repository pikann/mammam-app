import AxiosClientInstance from '../../../../utils/axios';

export const createRestaurantService = async (payload: any) => {
  return await AxiosClientInstance.post('restaurants', payload);
};

export const getPresignedUrlService = async () => {
  return await AxiosClientInstance.get('posts/presigned-url');
};

export const updateRestaurantService = async (payload: any) => {
  const {_id, ...body} = payload;
  return await AxiosClientInstance.patch(`restaurants/${_id}`, body);
};

import AxiosClientInstance from '../../../../utils/axios';

export const getPostOfRestaurantService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/posts/restaurant/${payload.restaurantId}?page=${payload.page}&perpage=12`,
  );
};

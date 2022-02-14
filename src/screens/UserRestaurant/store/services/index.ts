import AxiosClientInstance from '../../../../utils/axios';

export const getUserRestaurantService = async (page: number) => {
  return await AxiosClientInstance.get(
    `/restaurants/my?page=${page}&perpage=10`,
  );
};

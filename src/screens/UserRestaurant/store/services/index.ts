import AxiosClientInstance from '../../../../utils/axios';

export const getUserRestaurantService = async (page: number) => {
  return await AxiosClientInstance.get(
    `/restaurants/my?page=${page}&perpage=10`,
  );
};

export const deleteRestaurantService = async (id: string) => {
  return await AxiosClientInstance.delete(`/restaurants/${id}`, {});
};

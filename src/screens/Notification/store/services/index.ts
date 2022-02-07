import AxiosClientInstance from '../../../../utils/axios';

export const getNotificationService = async (page: number) => {
  return await AxiosClientInstance.get(
    `/notifications?page=${page}&perpage=10`,
  );
};

export const getOnePostService = async (id: string) => {
  return await AxiosClientInstance.get(`/posts/${id}`);
};

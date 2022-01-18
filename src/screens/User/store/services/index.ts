import AxiosClientInstance from '../../../../utils/axios';

export const getPostOfUserService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/posts/user/${payload.userId}?page=${payload.page}&perpage=12`,
  );
};

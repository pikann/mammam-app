import AxiosClientInstance from '../../../../utils/axios';

export const searchUserService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/users/search?keyword=${payload.keyword}&page=${payload.page}&perpage=12`,
  );
};

export const searchPostService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/posts/search?keyword=${payload.keyword}&page=${payload.page}&perpage=12`,
  );
};

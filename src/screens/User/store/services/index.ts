import AxiosClientInstance from '../../../../utils/axios';

export const getPostOfUserService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/posts/user/${payload.userId}?page=${payload.page}&perpage=12`,
  );
};

export const followService = async (userId: string) => {
  return await AxiosClientInstance.put(`/users/${userId}/follow`, {});
};

export const unfollowService = async (userId: string) => {
  return await AxiosClientInstance.put(`/users/${userId}/unfollow`, {});
};

export const getFollowersTotalService = async (userId: string) => {
  return await AxiosClientInstance.get(`/users/${userId}/follow`);
};

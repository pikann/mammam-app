import AxiosClientInstance from '../../../../utils/axios';

export const getPostsService = async () => {
  return await AxiosClientInstance.get('/posts?perpage=5');
};

export const likePostService = async (postId: string) => {
  return await AxiosClientInstance.put(`/posts/${postId}/like`, {});
};

export const dislikePostService = async (postId: string) => {
  return await AxiosClientInstance.put(`/posts/${postId}/dislike`, {});
};

export const viewPostService = async (postId: string) => {
  return await AxiosClientInstance.put(`/posts/${postId}/view`, {});
};

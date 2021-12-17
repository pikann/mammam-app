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

export const getCommentsService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/posts/${payload.postId}/comments?page=${payload.page}&perpage=10`,
  );
};

export const likeCommentService = async (commentId: string) => {
  return await AxiosClientInstance.put(`/comments/${commentId}/like`, {});
};

export const dislikeCommentService = async (commentId: string) => {
  return await AxiosClientInstance.put(`/comments/${commentId}/dislike`, {});
};

export const getRepliesCommentService = async (payload: any) => {
  return await AxiosClientInstance.get(
    `/comments/${payload.commentId}/replies?page=${payload.page}&perpage=10`,
  );
};

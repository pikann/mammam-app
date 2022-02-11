export interface IAuthor extends Document {
  _id: string;
  avatar: string;
  username: string;
  bio: string;
  isFollowed: boolean;
}

export interface IComment extends Document {
  _id: string;
  createdAt: number;
  author: IAuthor;
  content: string;
  likeTotal: number;
  replyTotal: number;
  isLiked: boolean;
  replies: IComment[];
  loadingReplies: boolean;
  pageReply: number;
}

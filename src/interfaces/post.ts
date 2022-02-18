export interface IAuthor {
  _id: string;
  avatar: string;
  username: string;
  bio: string;
  isFollowed: boolean;
}

export interface IRestaurant {
  readonly _id: string;
  readonly name: string;
  readonly bio: string;
  readonly avatar: string;
  readonly address: string;
  readonly admin: string;
  readonly latitude: number;
  readonly longitude: number;
}

export interface IPost {
  _id: string;
  createdAt: number;
  restaurant: IRestaurant | undefined;
  author: IAuthor;
  url: string;
  thumbnail: string;
  type: string;
  description: string;
  likeTotal: number;
  commentTotal: number;
  viewTotal: number;
  shareTotal: number;
  isLiked: boolean;
  loading: boolean;
}

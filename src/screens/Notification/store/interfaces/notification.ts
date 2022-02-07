export interface IUser {
  readonly _id: string;
  readonly avatar: string;
  readonly username: string;
  readonly bio: string;
}

export interface INotification {
  readonly _id: string;
  readonly seen: string[];
  readonly at: number;
  readonly about: string;
  readonly from: IUser[];
  readonly type: string;
  readonly isSeen: boolean;
}

type UserProfile = {
  login: string;
  bio: string;
  createAt: Date;
  listEmoji: string;
  coin: number;
  score: number;
  profilePicture: number;
  hasFriend: {
      hasFriendLogin: string;
  }[];
  nbTotalGamePlayed: number;
  nbTotalGameWon: number;
  nbTotalGameLost: number;
}

export type ResponseUserProfile = {
  status: number;
  userProfile: UserProfile;
  error: string;
};

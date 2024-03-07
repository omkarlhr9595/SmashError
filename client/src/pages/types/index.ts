type User = {
  sub: string;
  nickname: string;
  name: string;
  email: string;
  picture: string;
  rollNo: string;
  className: string;
  points: number;
  role: string;
  createdAt: string;
};

type Question = {
  id: string;
  title: string;
  content: string;
  userSub: string;
  aiAnswer: string;
  createdAt: string;
  updatedAt: string;
  vote: number;
  user: User;
  upvote: string[];
  downvote: string[];
  answer: Answer[];
  comment: CommentOnPost[];
  views: number;
  tags: string[];
};

type Upvote = {
  sub: string;
};

type Downvote = {
  sub: string;
};

type CommentOnPost = {
  id: string;
  content: string;
  userSub: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

type Answer = {
  id: string;
  content: string;
  userSub: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  upvote: Upvote[];
  downvote: Downvote[];
  comment: CommentOnPost[];
};

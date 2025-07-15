export type User = {
  name: string | undefined | null;
  email: string | undefined | null;
  image: string | undefined | null;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
};

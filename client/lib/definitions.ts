interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends Entity {
  username: string;
  token?: string;
}

export interface Post extends Entity {
  title: string;
  description: string;
  image: string;
  user?: User;
}
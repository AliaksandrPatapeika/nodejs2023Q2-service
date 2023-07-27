export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export type UserResponse = Omit<User, 'password'>;

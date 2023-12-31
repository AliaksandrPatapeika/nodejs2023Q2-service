export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface Token {
  id: string;
  refreshToken: string;
  userId: string;
}

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

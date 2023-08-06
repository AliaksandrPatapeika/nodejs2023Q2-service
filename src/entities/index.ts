import { AlbumEntity } from './album.entity';
import { ArtistEntity } from './artist.entity';
import { FavoritesEntity } from './favorites.entity';
import { TrackEntity } from './track.entity';
import { UserEntity } from './user.entity';

export * from './album.entity';
export * from './artist.entity';
export * from './favorites.entity';
export * from './track.entity';
export * from './user.entity';

export const entities = [
  AlbumEntity,
  ArtistEntity,
  FavoritesEntity,
  TrackEntity,
  UserEntity,
];

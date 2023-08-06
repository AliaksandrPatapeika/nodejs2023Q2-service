import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsString, IsUUID, IsInt } from 'class-validator';
import { Track } from 'src/interfaces';
import { ArtistEntity } from './artist.entity';
import { AlbumEntity } from './album.entity';
import { FavoritesEntity } from './favorites.entity';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column({
    default: null,
    nullable: true,
  })
  @IsUUID()
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Column({
    default: null,
    nullable: true,
  })
  @IsUUID()
  albumId: string | null;

  @Exclude()
  @ManyToOne(() => AlbumEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  album: AlbumEntity;

  @Column()
  @IsInt()
  duration: number;

  @Exclude()
  @ManyToOne(
    () => FavoritesEntity,
    (favorites: FavoritesEntity) => favorites.tracks,
  )
  favorites: FavoritesEntity;
}

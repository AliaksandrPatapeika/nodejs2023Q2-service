import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsString, IsUUID, IsInt } from 'class-validator';
import { Album } from 'src/interfaces';
import { FavoritesEntity } from './favorites.entity';
import { ArtistEntity } from './artist.entity';

@Entity('album')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsInt()
  year: number;

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

  @Exclude()
  @ManyToOne(
    () => FavoritesEntity,
    (favorites: FavoritesEntity) => favorites.albums,
    {
      onDelete: 'SET NULL',
    },
  )
  favorites: FavoritesEntity;
}

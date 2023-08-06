import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsString, IsBoolean, IsUUID } from 'class-validator';
import { FavoritesEntity } from 'src/entities';
import { Artist } from 'src/interfaces';

@Entity('artist')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column('boolean')
  @IsBoolean()
  grammy: boolean;

  @Exclude()
  @ManyToOne(
    () => FavoritesEntity,
    (favorites: FavoritesEntity) => favorites.artists,
    {
      onDelete: 'SET NULL',
    },
  )
  favorites: FavoritesEntity;
}

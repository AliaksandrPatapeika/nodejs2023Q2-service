import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ArtistEntity } from 'src/entities';
import { Album } from 'src/interfaces';
import { IsString, IsUUID, IsInt } from 'class-validator';

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

  @Column({ nullable: true, default: null })
  @IsUUID()
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: ArtistEntity;
}

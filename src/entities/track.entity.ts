import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsString, IsUUID, IsInt } from 'class-validator';
import { AlbumEntity, ArtistEntity } from 'src/entities';
import { Track } from 'src/interfaces';

@Entity('track')
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true, default: null })
  @IsUUID()
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Column({ nullable: true, default: null })
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
}

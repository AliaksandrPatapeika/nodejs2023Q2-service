import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from 'src/interfaces';
import { IsString, IsBoolean, IsUUID } from 'class-validator';

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
}

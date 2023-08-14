import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { Token } from 'src/interfaces';

@Entity('token')
export class TokenEntity implements Token {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  refreshToken: string;

  @Column()
  @IsString()
  userId: string;
}

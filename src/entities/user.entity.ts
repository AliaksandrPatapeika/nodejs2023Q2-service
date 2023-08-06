import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { User } from 'src/interfaces';
import { IsString, IsUUID, IsInt } from 'class-validator';

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  login: string;

  @Exclude()
  @Column()
  @IsString()
  password: string;

  @VersionColumn()
  @IsInt()
  version: number;

  @Transform(({ value }) => UserEntity.dateToTimestamp(value))
  @CreateDateColumn()
  @IsInt()
  createdAt: number;

  @Transform(({ value }) => UserEntity.dateToTimestamp(value))
  @UpdateDateColumn()
  @IsInt()
  updatedAt: number;

  static dateToTimestamp(value: Date): number {
    return new Date(value).getTime();
  }
}

import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { entities } from '../entities';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities,
  logging: true,
};

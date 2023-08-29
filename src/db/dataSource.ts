import { DataSource } from 'typeorm';
import { databaseConfig } from './databaseConfig';

export const dataSource = new DataSource(databaseConfig);

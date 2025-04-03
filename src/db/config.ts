import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  /*
   Note: Casting "as any" to avoid TypeORM type errors when building a generic template.
   Please import types specific to your database dialect, i. e. PostgresConnectionOptions
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: 'postgres',
  host: process.env.DATABASE_HOST, // ensure this is correctly pulled from your env
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // url: process.env.DATABASE_URL,
  entities: ['src/entities/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  migrationsRun: true,
  logging: true,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
  subscribers: [],
};

export default config;

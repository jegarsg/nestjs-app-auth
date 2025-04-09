// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@modules/auth/domain/entities/user.entity';

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'mco',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'Auth',
  entities: [User],
  synchronize: false, // ❗️Turn off in production
});

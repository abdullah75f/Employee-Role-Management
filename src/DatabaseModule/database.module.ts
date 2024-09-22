// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

// Load Environment Variables
config({
  path: ['.env', '.env.production', '.env.local'],
});

const sql = neon(process.env.DATABASE_URL);

const dbProvider = {
  provide: 'POSTGRES_POOL',
  useValue: sql,
};

@Module({
  imports: [ConfigModule],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}



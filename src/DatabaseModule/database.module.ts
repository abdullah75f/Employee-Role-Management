
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Client } from 'pg';
import { config } from 'dotenv';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

// Load Environment Variables
config({
  path: ['.env', '.env.production', '.env.local'],
});

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error', err));

const dbProvider = {
  provide: 'POSTGRES_CLIENT',
  useValue: client,
};

@Module({
  imports: [ConfigModule],
  providers: [dbProvider, DatabaseService],
  controllers: [DatabaseController],
  exports: [dbProvider],
})
export class DatabaseModule {}
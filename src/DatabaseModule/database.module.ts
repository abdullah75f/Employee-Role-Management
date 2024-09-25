import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Client } from 'pg';
import { config } from 'dotenv';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

// Loading Environment Variables for useage
config({
  path: ['.env', '.env.production', '.env.local'],
});

//using the postgress driver to connect to my database locally 
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


  //defining an object to connect to the database from my backennd
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
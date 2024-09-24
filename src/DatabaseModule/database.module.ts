// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Client } from 'pg';
import { config } from 'dotenv';


// Load Environment Variables
config({
  path: ['.env', '.env.production', '.env.local'],
});


const client =new Client({
  connectionString: process.env.CONNECTION_STRING
})


const dbProvider = {
  provide: 'POSTGRES_CLIENT',
  useValue: client,
};

@Module({
  imports: [ConfigModule],
  providers: [dbProvider],
  exports: [dbProvider],
 
})
export class DatabaseModule {}







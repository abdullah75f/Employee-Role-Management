// src/database/database.service.ts
import { Injectable, Inject } from '@nestjs/common';
import {Client} from 'pg'

@Injectable()
export class DatabaseService {
  constructor(@Inject('POSTGRES_POOL') private readonly sql) {}

  async createTable() {
    await this.sql`
      CREATE TABLE IF NOT EXISTS playing_with_neon (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        value TEXT
      );
    `;
  }

  async queryTable() {
    return await this.sql`SELECT * FROM playing_with_neon;`;
  }
}
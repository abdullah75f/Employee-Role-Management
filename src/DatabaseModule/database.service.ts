// src/database/database.service.ts
import { Injectable, Inject } from '@nestjs/common';
import {Client} from 'pg'

@Injectable()
export class DatabaseService {
  constructor(@Inject('POSTGRES_CLIENT') private readonly client:Client) {}

  async queryTable() {
    const result =  await this.client.query(`SELECT * FROM playing_with_neon;`);
  
  }
}
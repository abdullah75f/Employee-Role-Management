// src/database/database.service.ts
import { Injectable, Inject } from '@nestjs/common';
import {Client} from 'pg'

@Injectable()
export class DatabaseService {
  constructor(@Inject('POSTGRES_CLIENT') private readonly client:Client) {}

  async queryTable() : Promise<any[]>{

    const result =  await this.client.query(`SELECT * FROM roles;`);
    return result.rows;
  
  }
}

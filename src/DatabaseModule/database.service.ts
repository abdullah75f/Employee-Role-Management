
import { Injectable, Inject } from '@nestjs/common';
import {Client} from 'pg'

@Injectable()
export class DatabaseService {
  //instantiate my class overhere
  constructor(@Inject('POSTGRES_CLIENT') private readonly client:Client) {}
    //my business logic for querying my database
  async queryTable() : Promise<any[]>{
    const result =  await this.client.query(`SELECT * FROM role;`);
    return result.rows;
  
  }
  

  // async checkConnection(): Promise<void> {
  //   await this.client.query('SELECT 1');
  //   console.log('Database connection is healthy');
  // }
}



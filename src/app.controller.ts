import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './DatabaseModule/database.service';

@Controller()
export class AppController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('create-table')
    async createTable() {
      await this.databaseService.createTable();
      return 'Table created';
  }

  @Get('query-table')
    async queryTable() {
      const result = await this.databaseService.queryTable();
      return result;
  }
}



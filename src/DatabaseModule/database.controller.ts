import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

//Routes for database config to list every role avaialble
@Controller('database')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get('allroles')
    async getroles(){
        return this.databaseService.queryTable();
    }
}


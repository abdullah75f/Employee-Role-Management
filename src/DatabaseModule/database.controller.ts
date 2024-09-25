import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

//Routes 
@Controller('database')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get('allroles')
    async getroles(){
        return this.databaseService.queryTable();
    }
}


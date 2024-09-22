// src/app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule/database.module';
import { DatabaseService } from './DatabaseModule/database.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService,DatabaseService],
})
export class AppModule {}
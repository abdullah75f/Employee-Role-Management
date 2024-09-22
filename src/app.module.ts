// src/app.module.ts
import { Module } from '@nestjs/common';

import { DatabaseModule } from './DatabaseModule/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// src/app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionModule } from './position/position.module';


@Module({
  imports: [DatabaseModule, PositionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

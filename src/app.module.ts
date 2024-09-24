// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from './position/position.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PositionModule,
  ],
})
export class AppModule {}
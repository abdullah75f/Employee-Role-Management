import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from './position/position.module';
import { DatabaseModule } from './DatabaseModule/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'abdullah75farid',
      password: 'your_password',
      database: 'orga_structure',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),DatabaseModule, PositionModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}


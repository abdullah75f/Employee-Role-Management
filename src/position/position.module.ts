import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionController } from './position.controller';
import { RoleService } from './position.service';
import { Role } from './entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [PositionController],
  providers: [RoleService],
})
export class PositionModule {}
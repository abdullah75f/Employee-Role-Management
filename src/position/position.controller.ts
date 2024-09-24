// src/position/position.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  async create(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }
}
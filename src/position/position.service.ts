// position.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async createPosition(createPositionDto: CreatePositionDto): Promise<Position> {
    const { name, description, parentId } = createPositionDto;
    const position = this.positionRepository.create({ name, description, parentId });
    return this.positionRepository.save(position);
  }
}
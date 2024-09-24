// src/position/position.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    try {
      const { name, description, parentId } = createPositionDto;
      const position = new Position();
      position.name = name;
      position.description = description;

      if (parentId) {
        const parent = await this.positionRepository.findOne({ where: { id: parentId } });
        if (!parent) {
          throw new Error('Parent position not found');
        }
        position.parent = parent;
      }

      return await this.positionRepository.save(position);
    } catch (error) {
      // Return a rejected Promise with the error message
      return Promise.reject(error.message);
    }
  }
}
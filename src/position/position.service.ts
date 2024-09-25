// position.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/position.entity';
import { CreateRoleDto } from './dto/create-position.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private positionRepository: Repository<Role>,
  ) {}

  async createPosition(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description, parentId } = createRoleDto;

    // If parentId is not provided, set it to null (indicating the root position)
    const newPosition = this.positionRepository.create({ name, description, parentId: parentId || null });

    return this.positionRepository.save(newPosition);
  }
}
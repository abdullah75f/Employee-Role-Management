// position.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RoleService } from './position.service';
import { CreateRoleDto } from './dto/create-position.dto';
import { Role } from './entities/position.entity';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: RoleService) {}

  @Post()
  async createPosition(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.positionService.createPosition(createRoleDto);
  }
}
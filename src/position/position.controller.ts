// position.controller.ts
import { Controller, Post, Body,Put, Param} from '@nestjs/common';
import { RoleService } from './position.service';
import { CreateRoleDto } from './dto/create-position.dto';
import { UpdateRoleDto } from './dto/update-position.dto';
import { Role } from './entities/position.entity';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: RoleService) {}

  @Post()
  async createPosition(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.positionService.createPosition(createRoleDto);
  }
  @Put(':id')
  

  async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.positionService.updateRole(id, updateRoleDto);
  }

}
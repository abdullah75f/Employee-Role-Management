// position.controller.ts
import { Controller, Post, Body,Put, Param,Get,Delete} from '@nestjs/common';
import { RoleService } from './position.service';
import { CreateRoleDto } from './dto/create-position.dto';
import { UpdateRoleDto } from './dto/update-position.dto';
import { Role } from './entities/position.entity';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: RoleService) {}
  //fixed
  @Post()
  async createPosition(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.positionService.createPosition(createRoleDto);
  }
  //fixed
  @Put(':id')
  async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.positionService.updateRole(id, updateRoleDto);
  }
  //fixed
  @Get(':id')
  async getPositionById(@Param('id') id: string): Promise<Role | Role[]> {
    return this.positionService.getPositionById(id);
  }
  //not working
  @Get('structure')
  async getPositionHierarchy(): Promise<Role[]> {
    return this.positionService.getPositionHierarchy();
  }
  //fixed
  @Get(':id/children')
  async getChildrenOfPosition(@Param('id') id: string): Promise<Role[]> {
    return this.positionService.getChildrenOfPosition(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.removeRole(+id);
  }
  



}
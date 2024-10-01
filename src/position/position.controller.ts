import { Controller, Post, Body,Put, Param,Get,Delete,InternalServerErrorException} from '@nestjs/common';
import { RoleService } from './position.service';
import { CreateRoleDto } from './dto/create-position.dto';
import { UpdateRoleDto } from './dto/update-position.dto';
import { Role } from './entities/position.entity';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: RoleService) {}

 //Logic for creating a role in my API
  @Post()
  async createPosition(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.positionService.createPosition(createRoleDto);
  } 
//Logic for getting the whole structure for our role in the API
   @Get('structure')
   async getPositionHierarchy(): Promise<Role[] > {
     return this.positionService.getPositionById('structure');
   }

   @Get(':id/children/tree')
  async findChildrenTree(@Param('id') id: string): Promise<any> {
    try {
      const tree = await this.positionService.findTree(id);
      return tree;
    } catch (error) {
      console.error('Error in findChildrenTree:', error);
      throw new InternalServerErrorException('Failed to fetch tree structure');
    }
  }

//Logic for updating a role in the API
  @Put(':id')
  async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.positionService.updateRole(id, updateRoleDto);
  }

   //Logic for getting a role based on our id in the API
  @Get(':id')
  async getPositionById(@Param('id') id: string): Promise<Role | Role[]> {
    return this.positionService.getPositionById(id);
  }
  


     //Logic for getting the childeren of a given role in the API
     @Get(':id/children') 
     async getChildrenOfPosition(@Param('id') id: string): Promise<Role[]> {
       return this.positionService.getChildrenOfPosition(id);
     }

  

   //Logic for deleting a given role in the API
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.removeRole(id);
  }
  
}
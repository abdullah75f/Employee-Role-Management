import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/position.entity';
import { CreateRoleDto } from './dto/create-position.dto';
import { UpdateRoleDto } from './dto/update-position.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private positionRepository: Repository<Role>,
  ) {}

    //insert new role
  async createPosition(createRoleDto: CreateRoleDto): Promise<Role> {
    const newPosition = this.positionRepository.create({
      name: createRoleDto.name,
      description: createRoleDto.description,
      parentId: createRoleDto.parentId || null
  });

  await this.positionRepository.insert(newPosition);
  return newPosition;
  }

  //Update previously saved role
  async updateRole(id: string, updateRoleDto: Partial<UpdateRoleDto>): Promise<Role> {
   
    try{

    const role = await this.positionRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException('Role not found');
    }
    await this.positionRepository.update(role.id, updateRoleDto);
        const updatedRole = await this.positionRepository.findOne({ where: { id } });

        if (!updatedRole) {
            throw new InternalServerErrorException('Failed to fetch updated role');
        }
        return updatedRole;
    
  }
  catch (error) {
    throw new InternalServerErrorException('Failed to update role');
  }   
}

//get a specific role by using id
async getPositionById(id: string): Promise<Role[]> {
  try {
    if (id === 'structure') {
     
      return this.positionRepository.find(); 
    } else {
      const role = await this.positionRepository.findOne({ where: { id } });

      if (!role) {
        throw new Error('Role not found');
      }

      return [role];
    }
  } catch (error) {
    throw new Error(`Error in fetching role: ${(error as any).message}`);
  }
}

// async getPositionHierarchy(): Promise<Role[]> {
//   // Return an array of Role entities for position hierarchy
//   return this.positionRepository.find();
// }
//Get all childrens of a specific position/role 
async getChildrenOfPosition(id: string): Promise<Role[]> {
  

  const allPositions = await this.positionRepository.find({where:{parentId:id}});


  return allPositions;
}

async removeRole(id: string): Promise<void> {
  const role = await this.positionRepository.findOne({ where: { id } });
  if (!role) {
    throw new NotFoundException({ message: "Role Not Found" });
  }

  // Update children's parent ID if they exist
  const children = await this.positionRepository.find({ where: { parentId: id } });
  if (children.length > 0) {
    await Promise.all(children.map(child => {
      child.parentId = role.parentId;
      return this.positionRepository.save(child);
    }));
  }

  // Delete the role
  await this.positionRepository.delete(id);
}



}
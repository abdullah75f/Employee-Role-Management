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
    //insert mew role
  async createPosition(createRoleDto: CreateRoleDto): Promise<Role> {
    // Access properties of createRoleDto directly
    const newPosition = this.positionRepository.create({
      name: createRoleDto.name,
      description: createRoleDto.description,
      parentId: createRoleDto.parentId || null
  });

  await this.positionRepository.insert(newPosition);
  return newPosition;

    
    // const { name, description, parentId } = createRoleDto;

    // // If parentId is not provided, set it to null
    // const newPosition = this.positionRepository.create({ name, description, parentId: parentId || null });

    // return this.positionRepository.save(newPosition);
  }

  //Update previously saved role
  async updateRole(id: string, updateRoleDto: Partial<UpdateRoleDto>): Promise<Role> {
    // const { name, description, parentId } = updateRoleDto;
    try{

    const role = await this.positionRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException('Role not found');
    }
    await this.positionRepository.update(role.id, updateRoleDto);
        // Fetch the updated role from the database
        const updatedRole = await this.positionRepository.findOne({ where: { id } });

        if (!updatedRole) {
            throw new InternalServerErrorException('Failed to fetch updated role');
        }
        return updatedRole;

    // role.name = name;
    // role.description = description;
    // role.parentId = parentId;

    // const updatedRole = await this.positionRepository.update(role.id,updateRoleDto);
    // console.log('Role updated successfully', updatedRole);
    // return updatedRole;
    
  }
  catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    throw new InternalServerErrorException('Failed to update role');
  }

   
}

async getPositionById(id: string): Promise<Role | Role[]> {
  try {
    if (id === 'structure') {
      // Return position hierarchy if id is 'structure'
      return this.getPositionHierarchy() // Return the first role for demo purposes
    } else {
      const role = await this.positionRepository.findOne({ where: { id } });

      if (!role) {
        throw new Error('Role not found');
      }

      return role;
    }
  } catch (error) {
    throw new Error(`Error in fetching role: ${(error as any).message}`);
  }
}

async getPositionHierarchy(): Promise<Role[]> {
  // Return an array of Role entities for position hierarchy
  return this.positionRepository.find();
}
//Get all childrens of a specific position/role 
async getChildrenOfPosition(id: string): Promise<Role[]> {
  // const position = await this.positionRepository.findOne({ where: { id } });
  // if (!position) {
  //   throw new NotFoundException('Position not found');
  // }

  // const children: Role[] = [];

  // const findChildren = (parentId: string) => {
  //   const childPositions = allPositions.filter((pos) => pos.parentId === parentId);
  //   childPositions.forEach((child) => {
  //     children.push(child);
  //     findChildren(child.id);
  //   });
  // };

  const allPositions = await this.positionRepository.find({where:{parentId:id}});
  // findChildren(id);

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
// position.service.ts
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

  async createPosition(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description, parentId } = createRoleDto;

    // If parentId is not provided, set it to null (indicating the root position)
    const newPosition = this.positionRepository.create({ name, description, parentId: parentId || null });

    return this.positionRepository.save(newPosition);
  }

  //here
  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { name, description, parentId } = updateRoleDto;
    try{

    const role = await this.positionRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    role.name = name;
    role.description = description;
    role.parentId = parentId;

    const updatedRole = await this.positionRepository.save(role);
    console.log('Role updated successfult', updatedRole);
    return updatedRole;
    
  }
  catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    throw new InternalServerErrorException('Failed to update role');
  }

   
}

async getPositionById(id: string): Promise<Role> {
  const role = await this.positionRepository.findOne(id);
  if (!role) {
    throw new NotFoundException('Role not found');
  }
  return role;
}

async getPositionHierarchy(): Promise<Role[]> {
  const allPositions = await this.positionRepository.find();
  const positionsMap = new Map<string, Role>();
  const hierarchy: Role[] = [];

  allPositions.forEach((position) => {
    positionsMap.set(position.id, position);
  });

  allPositions.forEach((position) => {
    if (!position.parentId) {
      hierarchy.push(position);
    } else {
      const parent = positionsMap.get(position.parentId);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(position);
      }
    }
  });

  return hierarchy;
}

async getChildrenOfPosition(id: string): Promise<Role[]> {
  const position = await this.positionRepository.findOne(id);
  if (!position) {
    throw new NotFoundException('Position not found');
  }

  const children: Role[] = [];

  const findChildren = (parentId: string) => {
    const childPositions = allPositions.filter((pos) => pos.parentId === parentId);
    childPositions.forEach((child) => {
      children.push(child);
      findChildren(child.id);
    });
  };

  const allPositions = await this.positionRepository.find();
  findChildren(id);

  return children;
}


}
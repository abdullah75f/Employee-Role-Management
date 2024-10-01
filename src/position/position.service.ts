import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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
async getChildrenOfPosition(id: string): Promise<Role[]> {
  const allPositions = await this.positionRepository.find({where:{parentId:id}});
  return allPositions;
} 



// // Find the tree structure/main 101
// findTree(id: string): Promise<{ [key: string]: any }> {
//   const buildRoleTree = (parentId: string): Promise<{ [key: string]: any }> => {
//     return this.positionRepository.find({ where: { parentId } })
//       .then(subRoles => {
//         const subRoleTreePromises = subRoles.map(subRole => {
//           //recursion
//           return buildRoleTree(subRole.id).then(nestedSubRoles => ({
//             id: subRole.id,
//             name: subRole.name,
//             description: subRole.description,
//             parentId: subRole.parentId,
//             children: nestedSubRoles
//           }));
//         });
//         return Promise.all(subRoleTreePromises);
//       });
//   };

//   return this.positionRepository.findOne({ where: { id } })
//     .then(mainRole => {
//       if (!mainRole) {
//         return Promise.reject(new NotFoundException('Role not found'));
//       }
//       return buildRoleTree(id).then(roleTree => ({
//         id: mainRole.id,
//         name: mainRole.name,
//         description: mainRole.description,
//         parentId: mainRole.parentId,
//         children: roleTree
//       }));
//     })
//     .catch(error => {
//       console.error('Error in getRoleHierarchy:', error);
//       throw new InternalServerErrorException('Failed to fetch role tree structure');
//     });
// }

 // Find the entire tree structure
 findTree(): Promise<{ [key: string]: any }> {
  return this.positionRepository.find()
    .then(roles => {
      const roleTree: { [key: string]: any } = {};

      
      roles.forEach(role => {
        roleTree[role.id] = {
          id: role.id,
          name: role.name,
          description: role.description,
          parentId: role.parentId,
          children: []
        };
      });

      //Recursion 
      const buildRoleTree = (parentId: string): { [key: string]: any }[] => {
        return roles
          .filter(role => role.parentId === parentId)
          .map(role => ({
            ...roleTree[role.id],
            children: buildRoleTree(role.id)
          }));
      };

     //My parent role
      const tree: { [key: string]: any } = {};
      roles.forEach(role => {
        if (!role.parentId) {
          tree[role.id] = {
            ...roleTree[role.id],
            children: buildRoleTree(role.id)
          };
        }
      });

      return tree;
    })
    .catch(error => {
      console.error('Error in findTree:', error);
      throw new InternalServerErrorException('Failed to fetch role tree structure');
    });
}

//deleting a role
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
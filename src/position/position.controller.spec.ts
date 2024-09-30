import { Test, TestingModule } from '@nestjs/testing';
import { PositionController } from './position.controller';
import { RoleService } from './position.service';
import { Role } from './entities/position.entity';
import { CreateRoleDto } from './dto/create-position.dto';
import { UpdateRoleDto } from './dto/update-position.dto';

describe('PositionController', () => {
  let controller: PositionController;
  let roleService: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionController],
      providers: [
        {
          provide: RoleService,
          useValue: {
            createPosition: jest.fn(),
            updateRole: jest.fn(),
            getPositionById: jest.fn(),
            getPositionHierarchy: jest.fn(),
            getChildrenOfPosition: jest.fn(),
            removeRole: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PositionController>(PositionController);
    roleService = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPosition', () => {
    it('should create a new role', async () => {
      const createRoleDto = { name: 'Manager', description: 'Team Manager', parentId: null };
      const mockCreatedRole = { id: '1', ...createRoleDto };
      jest.spyOn(roleService, 'createPosition').mockImplementation(async (createRoleDto: CreateRoleDto) => {
        const mockCreatedRole: Role = {
          id: '1',
          name: createRoleDto.name,
          description: createRoleDto.description,
          parentId: createRoleDto.parentId || null,
          parent: null,
          children: []
        };
        return mockCreatedRole;
      });
    });
  });

  describe('updateRole', () => {
    it('should update an existing role', async () => {
      const updateRoleDto = { name: 'Supervisor', description: 'Team Supervisor', parentId: null };
      const roleId = '1';
      const mockUpdatedRole = { id: roleId, ...updateRoleDto };
      jest.spyOn(roleService, 'updateRole').mockImplementation(async (id: string, updateRoleDto: Partial<UpdateRoleDto>) => {
        const updatedRole: Role = {
          id,
          name: updateRoleDto.name || '',
          description: updateRoleDto.description || '',
          parentId: updateRoleDto.parentId || null,
          parent: null,
          children: []
        };
        return updatedRole;
      });
    });
  });

  describe('getPositionById', () => {
    it('should get a role by ID', async () => {
      const roleId = '1';
      const mockRole: Role = { 
        id: roleId, 
        name: 'Manager', 
        description: 'Team Manager', 
        parentId: null,
        parent: null, 
        children: []
      };
      
      jest.spyOn(roleService, 'getPositionById').mockResolvedValue([mockRole]); // Return an array with a single Role object
  
      expect(await controller.getPositionById(roleId)).toEqual(mockRole);
      expect(roleService.getPositionById).toHaveBeenCalledWith(roleId);
    });
  });

  describe('getChildrenOfPosition', () => {
    it('should get children of a specific position', async () => {
      const positionId = '1';
      const mockChildren = [
        { id: '2', name: 'Manager', description: 'Team Manager', parentId: '1', parent: null, children: [] },
        { id: '3', name: 'Supervisor', description: 'Team Supervisor', parentId: '1', parent: null, children: [] }
      ];
      
      jest.spyOn(roleService, 'getChildrenOfPosition').mockResolvedValue(mockChildren as Role[]); 
  
      expect(await controller.getChildrenOfPosition(positionId)).toEqual(mockChildren);
      expect(roleService.getChildrenOfPosition).toHaveBeenCalledWith(positionId);
    });
  });

  describe('removeRole', () => {
    it('should remove a role by ID', async () => {
      const roleId = '1';
      jest.spyOn(roleService, 'removeRole').mockResolvedValue(undefined);

      await controller.remove(roleId);
      expect(roleService.removeRole).toHaveBeenCalledWith(roleId);
    });
  });
});
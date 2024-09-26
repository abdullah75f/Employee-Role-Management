import { Test, TestingModule } from '@nestjs/testing';
import { PositionController } from './position.controller';
import { RoleService } from './position.service';

// # Run Jest with a pattern to match only the test files for PositionController
// npx jest **/position.controller.spec.ts
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
      jest.spyOn(roleService, 'createPosition').mockResolvedValue(mockCreatedRole);

      expect(await controller.createPosition(createRoleDto)).toEqual(mockCreatedRole);
      expect(roleService.createPosition).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('updateRole', () => {
    it('should update an existing role', async () => {
      const updateRoleDto = { name: 'Supervisor', description: 'Team Supervisor', parentId: null };
      const roleId = '1';
      const mockUpdatedRole = { id: roleId, ...updateRoleDto };
      jest.spyOn(roleService, 'updateRole').mockResolvedValue(mockUpdatedRole);

      expect(await controller.updateRole(roleId, updateRoleDto)).toEqual(mockUpdatedRole);
      expect(roleService.updateRole).toHaveBeenCalledWith(roleId, updateRoleDto);
    });
  });

  describe('getPositionById', () => {
    it('should get a role by ID', async () => {
      const roleId = '1';
      const mockRole = { id: roleId, name: 'Manager', description: 'Team Manager', parentId: null };
      jest.spyOn(roleService, 'getPositionById').mockResolvedValue(mockRole);

      expect(await controller.getPositionById(roleId)).toEqual(mockRole);
      expect(roleService.getPositionById).toHaveBeenCalledWith(roleId);
    });
  });

  describe('getPositionHierarchy', () => {
    it('should get the position hierarchy', async () => {
      const mockPositionHierarchy = [
        { id: '1', name: 'CEO', description: 'Chief Executive Officer', parentId: '2' },
        { id: '2', name: 'Manager', description: 'Team Manager', parentId: '1' }
      ];
      jest.spyOn(roleService, 'getPositionHierarchy').mockResolvedValue(mockPositionHierarchy);

      expect(await controller.getPositionHierarchy()).toEqual(mockPositionHierarchy);
      expect(roleService.getPositionHierarchy).toHaveBeenCalled();
    });
  });

  describe('getChildrenOfPosition', () => {
    it('should get children of a specific position', async () => {
      const positionId = '1';
      const mockChildren = [
        { id: '2', name: 'Manager', description: 'Team Manager', parentId: '1' },
        { id: '3', name: 'Supervisor', description: 'Team Supervisor', parentId: '1' }
      ];
      jest.spyOn(roleService, 'getChildrenOfPosition').mockResolvedValue(mockChildren);

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
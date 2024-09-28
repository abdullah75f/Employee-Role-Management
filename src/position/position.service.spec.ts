// position.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './position.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/position.entity';

describe('PositionService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
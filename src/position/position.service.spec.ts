// position.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PositionService } from './position.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';

describe('PositionService', () => {
  let service: PositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PositionService,
        {
          provide: getRepositoryToken(Position),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PositionService>(PositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more test cases as needed for the PositionService methods
});
import { Test, TestingModule } from '@nestjs/testing';
import { TimeSheetController } from './time-sheet.controller';
import { TimeSheetService } from './time-sheet.service';

describe('TimeSheetController', () => {
  let controller: TimeSheetController;
  let service: Partial<Record<keyof TimeSheetService, jest.Mock>>;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeSheetController],
      providers: [
        {
          provide: TimeSheetService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TimeSheetController>(TimeSheetController);
    service = module.get<TimeSheetService>(TimeSheetService) as any;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of time sheets for admin', async () => {
      const result = ['timeSheet1', 'timeSheet2'];
      service.findAll.mockResolvedValue(result);

      // Simula ser un usuario admin
      const user = { userId: 1, is_admin: true };
      expect(await controller.findAll(user)).toEqual(result);
    });

    it('should return time sheets for a specific user if not admin', async () => {
      const result = ['timeSheet1'];
      service.findByUserId.mockResolvedValue(result);

      // Simula ser un usuario no admin
      const user = { userId: 1, is_admin: false };
      expect(await controller.findAll(user)).toEqual(result);
      expect(service.findByUserId).toHaveBeenCalledWith(user.userId);
    });
  });

  // Mas casos de prueba según sea necesario
});

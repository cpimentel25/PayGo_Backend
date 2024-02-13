import { Test, TestingModule } from '@nestjs/testing';
import { TimeSheetService } from './time-sheet.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TimeSheet } from './time-sheet.entity';
import { CreateTimeSheetDto } from './dto/create-time-sheet.dto';

interface MockRepository {
  create: jest.Mock;
  save: jest.Mock;
}

describe('TimeSheetService', () => {
  let service: TimeSheetService;
  let mockRepository: MockRepository;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeSheetService,
        {
          provide: getRepositoryToken(TimeSheet),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TimeSheetService>(TimeSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create multiple time sheets when given an array of DTOs', async () => {
    const createTimeSheetDtos: CreateTimeSheetDto[] = [
      {
        employeeName: 'John Doe',
        hourlyRate: 15.5,
        hours: 8,
        description: 'Worked on project X',
        userId: 1,
      },
      {
        employeeName: 'Jane Doe',
        hourlyRate: 20,
        hours: 10,
        description: 'Worked on project Y',
        userId: 2,
      },
    ];

    const savedTimeSheets = createTimeSheetDtos.map((dto) => ({
      ...dto,
      id: expect.any(Number),
      totalPay: dto.hourlyRate * dto.hours,
      date: expect.any(Date),
      status: 'Pending',
    }));

    mockRepository.save.mockResolvedValue(savedTimeSheets);

    const results = await service.create(createTimeSheetDtos);

    expect(results).toEqual(savedTimeSheets);
    expect(mockRepository.save).toHaveBeenCalledWith(
      expect.arrayContaining(
        createTimeSheetDtos.map((dto) => expect.objectContaining(dto)),
      ),
    );
  });

  // Más pruebas según sea necesario...
});

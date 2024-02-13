// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

interface MockRepository {
  findOne: jest.Mock;
  save: jest.Mock;
}

describe('UserService', () => {
  let service: UserService;
  let mockUsersRepository: MockRepository;

  beforeEach(async () => {
    mockUsersRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return it', async () => {
    const userDto = {
      email: 'test@example.com',
      password: 'password',
      is_admin: false,
    };
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const expectedSavedUser = { ...userDto, password: hashedPassword, id: 1 };

    mockUsersRepository.save.mockResolvedValue(expectedSavedUser);

    const result = await service.create(userDto);
    expect(result).toEqual(expectedSavedUser);
    expect(mockUsersRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        email: userDto.email,
        password: expect.any(String), // Since the password is hashed, we expect any string
        is_admin: userDto.is_admin,
      }),
    );
  });
});

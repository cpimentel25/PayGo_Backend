import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

interface MockUserService {
  create: jest.Mock;
}

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: MockUserService;

  beforeEach(async () => {
    mockUserService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user successfully', async () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password',
      is_admin: false,
    };
    const expectedUser = { ...createUserDto, id: 1 };

    mockUserService.create.mockResolvedValue(expectedUser);

    const result = await controller.register(createUserDto);
    expect(result).toEqual(expectedUser);
    expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
  });
});

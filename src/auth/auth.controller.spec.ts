import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    // Mocks de los servicios
    const mockAuthService = {
      login: jest.fn(),
    };
    const mockUserService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call UserService.create with a user', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
        is_admin: false,
        timeSheets: [],
        // Propiedades requeridas por tu entidad User
      };

      await controller.register(user);
      expect(userService.create).toHaveBeenCalledWith(user);
    });
  });

  describe('login', () => {
    it('should call AuthService.login with email and password', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password',
      };

      await controller.login(loginDto);
      expect(authService.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });
  });

  // Más pruebas según sea necesario...
});

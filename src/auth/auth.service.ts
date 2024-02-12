import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.validateUser(email, password);

    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      is_admin: user.is_admin,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

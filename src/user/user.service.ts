import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.email = user.email;
    newUser.password = await bcrypt.hash(user.password, 10);
    newUser.is_admin = user.is_admin;

    return this.usersRepository.save(newUser);
  }

  // Implementación de validateUser
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Retorna el usuario si las credenciales son correctas
    }
    return null; // Retorna null si el usuario no existe o la contraseña no coincide
  }
}

import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    { message: 'Por favor, proporciona un correo electrónico válido' },
  )
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;

  @IsBoolean({ message: 'is_admin debe ser un valor booleano' })
  is_admin: boolean;
}

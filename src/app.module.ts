import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TimeSheetModule } from './time-sheet/time-sheet.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
      envFilePath: '.env',
      // expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // en desarrollo puede estar en true, pero debería ser false en producción
    }),
    AuthModule,
    UsersModule,
    TimeSheetModule,
    // otros módulos...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// src/modules/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@modules/auth/infrastructure/controllers/auth.controller';
import { AuthService } from '@modules/auth/application/services/auth.service';
import { User } from '@modules/auth/domain/entities/user.entity';
import { IUserRepository } from '@modules/auth/domain/repositories/user.repository';
import { UserRepositoryImpl } from '@modules/auth/infrastructure/repositories/user.repository.impl';
import { JwtStrategy } from '@modules/auth/infrastructure/strategies/jwt.strategy';
import { UserController } from '@modules/auth/infrastructure/controllers/user.controller';
import { UserService } from '@modules/auth/application/services/user.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AuthController,
    UserController,  
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: IUserRepository,
      useClass: UserRepositoryImpl,
    },
    UserService,       
  ],
})
export class AuthModule {}
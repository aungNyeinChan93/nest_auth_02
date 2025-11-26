/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtAuthStrategy } from './strategies/jwt-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy, JwtAuthStrategy],
  imports: [
    JwtModule.register({ global: true }),
    PassportModule,
    UsersModule,
  ],
  exports: [
    JwtService, AuthService, LocalStrategy, JwtAuthStrategy
  ]
})
export class AuthModule { }

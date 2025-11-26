/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { type User } from 'src/users/types/users.types';
import { type Response, type Request } from 'express';
import { CurrentUser } from './decorators/current-user.decorator';
import { LocalAuthGuard } from './guard/local-guard.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RoleGuard } from './guard/role.guard';
import { UserRole } from '@prisma/client';
import { Role } from './decorators/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.regirster(createUserDto);
  }

  @Post('login')
  login(@Body() userLoginDto: Pick<User, 'email' | "password">) {
    return this.authService.login(userLoginDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('test-auth')
  testAuth(@Req() request: Request, @CurrentUser() user: User, @Res() response: Response) {
    response.cookie('token', request?.headers.authorization?.split(' ')[1])
    response.cookie('token_2', request?.headers.authorization?.split(' ')[2])
    return response.json({
      request: request?.user,
      user,
      agent: request?.headers['user-agent']
    })
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.admin)
  @Post('test-jwt')
  testJwt(@Req() request: Request, @CurrentUser() user: User) {
    return { user, test: request?.user }
  }
}

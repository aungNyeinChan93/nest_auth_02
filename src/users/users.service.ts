/* eslint-disable prettier/prettier */


import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }


  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto?.password, await bcrypt.genSalt(10))
    const user = await this.prisma.user.create({
      data: { ...createUserDto, password: hashPassword }
    })
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found!')
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) throw new NotFoundException('User not found!')
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    if (!user) throw new NotFoundException('user not found!')
    await this.prisma.user.delete({ where: { id } })
    return new HttpException('', HttpStatus?.NO_CONTENT);
  }
}

/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from './types/auth.types';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { type User } from 'src/users/types/users.types';


@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private userService: UsersService,
    ) { };


    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, await bcrypt.genSalt(10))
    };

    async comparePassword(plainPassword: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashPassword)
    };

    public generateToken(payload: TokenPayload) {
        const token = this.jwt.sign(payload, {
            secret: 'jwt_secret',
            expiresIn: "7d"
        });
        if (!token) throw new ConflictException('Token is not valid!')
        return token;
    };

    public async regirster(createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);
        const token = this.generateToken({ id: user?.id, email: user?.email })
        return { user, token };
    }


    public async login(userLoginDto: Pick<User, 'email' | 'password'>) {
        const user = await this.userService.findByEmail(userLoginDto?.email);
        const isCorrectPassword = await this.comparePassword(userLoginDto.password, user?.password);
        if (!user && !isCorrectPassword) throw new ConflictException('Credential error!')
        const token = this.generateToken({ id: user?.id, email: user?.email });
        return { user, token }
    }

}

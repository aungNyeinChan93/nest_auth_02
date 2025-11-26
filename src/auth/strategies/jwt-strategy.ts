/* eslint-disable prettier/prettier */


import { TokenPayload } from './../types/auth.types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/types/users.types';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {

    constructor(
        private userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'jwt_secret'
        })
    }

    async validate(payload: TokenPayload): Promise<User> {
        const user = await this.userService.findOne(payload?.id);
        if (!user) throw new NotFoundException('Token invalid')
        return user;
    }

}

/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) {
        super(
            { usernameField: 'email' }
        );
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (!(await this.authService.comparePassword(password, user?.password))) {
            throw new UnauthorizedException('user is not unAuthorize')
        }
        if (!user) throw new Error(JSON.stringify(user, null, 2))
        return user;
    }

}
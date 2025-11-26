/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { $Enums, UserRole } from "@prisma/client";
import { User } from "../types/users.types";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";



export class CreateUserDto implements User {

    @IsOptional()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: $Enums.UserRole;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}


/* eslint-disable prettier/prettier */
import { Prisma } from "@prisma/client";



export type User = Prisma.UserGetPayload<object>;

export type CreateUser = Prisma.UserCreateInput;

export type UpdateUser = Prisma.UserUpdateInput;


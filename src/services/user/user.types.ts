import type { User } from "../../domain/user/entity.js";
import type { UserGet, NewUser } from "../../domain/user/repository.js";

export type LoginUserData = Omit<User, "createdAt" | "id"| "name">;

export interface UserServices{
    register(data: NewUser):Promise<boolean>; 
    getById(id: number):Promise<UserGet| undefined>
    login(data: LoginUserData): Promise<UserGet | undefined | null>
}

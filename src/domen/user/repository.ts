import type { User } from "./entity.js";

export type UserGet = Omit<User, "password">
export type NewUser = Omit<User, "createdAt" | "id">;

export interface UserRepository{
    addUser(data: NewUser): Promise<User>
    getById(id: number): Promise<UserGet| undefined>
    getByEmail(email: string): Promise<User | undefined>
}
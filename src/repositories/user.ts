import type { UserRepository, UserGet } from "../domen/user/repository.js";
import  { jsonUserEditor } from "./utils/editJson.js";


export function createUserRepository(): UserRepository {
    return{
        
       async addUser(data){
        const userStorage = await jsonUserEditor.readJson('users');
        const currentDate = new Date();
        const user = {
            id: userStorage.length + 1,
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: currentDate
        }

        userStorage.push(user);
        await jsonUserEditor.writeJson('users', userStorage);
        return user;
       },

       async getById(id){
        const userStorage = await jsonUserEditor.readJson('users');
        const user = userStorage.find(user=> user.id === id);
        return user;
       },
       
       async getByEmail(email){
        const userStorage = await jsonUserEditor.readJson('users');
        console.log(typeof userStorage);
        const user = userStorage.find(user=> user.email === email);
        return user;
       } 
    }
}
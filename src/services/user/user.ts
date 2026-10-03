import type { UserRepository } from '../../domen/user/repository.js';
import type {UserServices} from "./user.types.js"


export function createUserService(repository: UserRepository): UserServices{
    return{
        async register(data){
            const {email} = data;
            const getByEmail = await repository.getByEmail(email);
            if(getByEmail){
                return true;
            }
            await repository.addUser(data);
            return false;
        },
        async getById(id){
            if(!await repository.getById(id)){
                return undefined;
            }
            return await repository.getById(id)
        },
        async login(data){
            const {email, password} = data;
            const getByEmail = await repository.getByEmail(email);
            if(!getByEmail){
                return null;
            }
            if ( password !== getByEmail.password){
                return null;
            }

            const user = {
                id: getByEmail.id,
                email: getByEmail.email,
                name: getByEmail.name,
                createdAt: getByEmail.createdAt
            };
            return user;
        }
    }
}




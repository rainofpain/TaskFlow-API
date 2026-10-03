import type { Request, Response } from "express";
import type { UserServices } from "../../services/user/user.types.js";
import type { LoginRequest, RegisterRequest } from "../dto/requests.js";
import type { UserResponse } from "../dto/response.js";
import type { Error } from "../dto/errors.js";


export interface UserHandler{
    register(req: Request<{}, {}, RegisterRequest , {} >, res: Response): Promise<Response>
    getById(req: Request<{id:string},{},{},{}>, res: Response<UserResponse | Error>): Promise<Response>
    login(req: Request<{}, {}, LoginRequest, {}>, res: Response<UserResponse| Error>): Promise<Response>
}

export function createUserHandler(service: UserServices): UserHandler{
    return{
        async register(req, res){
            const {email, name, password} = req.body
            if( typeof email !== "string" ||
                typeof name !== "string" ||
                typeof password !== "string" ||
                !email.trim() ||
                !name.trim() ||
                !password.trim()
            ){
                return res.status(422).json({
                    message: 'Invalid data.'
                });
            }
            try{
                const result = await service.register(req.body);
                if(result){
                    return res.status(409).json({
                        message: 'User with this email already exists.'
                    });
                }
                
                return res.status(201).json({
                    message: 'User was created.'
                });
            } catch(error){
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        },
        async getById(req, res){
            const {id} = req.params;
            const numberId = Number(id);
            if(numberId < 0 || !Number.isInteger(numberId)){
                return res.status(400).json({
                    message: 'Invalid data in id params.'
                })
            }
            try{
                const result = await service.getById(numberId)
                if(!result){
                    return res.status(404).json({
                        message: 'There is no user with this id.'
                    });
                }
                return res.status(200).json(result);
            } catch(error){
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        },

        async login(req, res){
            const {email, password} = req.body
            if(
                typeof email !=='string'||
                typeof password !=='string'||
                !email.trim()||
                !password.trim()
            ){
                return res.status(422).json({
                    message: 'Invalid data.'
                })
            }
            try{
                const result = await service.login(req.body)
                if(!result){
                    return res.status(404).json({
                        message: 'Invalid email or password'
                    })
                }
                return res.status(200).json(result);
            } catch(error){
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        }
    }
}
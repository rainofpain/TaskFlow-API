import { Router } from "express"
import type { UserHandler } from "../handlers/user.js"

export function createUserRouter(handler: UserHandler){
    const router = Router();
    router.get('/:id', handler.getById);
    return router;
}
export function createAuthRouter(handler: UserHandler){
    const router = Router();
    router.post('/register',  handler.register);
    router.post('/login', handler.login);
    return router;
}

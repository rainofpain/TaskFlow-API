import {Router} from 'express'
import type {TaskHandler} from "../handlers/task.js"

export function createTaskRouter(handler: TaskHandler){
    const router = Router();
    router.get('/', handler.getAllTasks);
    router.get('/:id', handler.getTaskById);
    router.post('/', handler.addNewTask);
    router.patch('/:id', handler.changeTaskById);
    router.delete('/:id', handler.deleteTaskById);

    return router;
}

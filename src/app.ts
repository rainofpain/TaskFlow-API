import express from 'express';
import { createUserRepository } from './repositories/user.js';
import { createUserService } from './services/user/user.js';
import { createUserHandler } from './transport/handlers/user.js';
import { createUserRouter, createAuthRouter } from './transport/routers/user.js';
import { createTaskHandler } from './transport/handlers/task.js';
import { createTaskService } from './services/task/task.js';
import { createTaskRepository } from './repositories/task.js';
import { createTaskRouter } from './transport/routers/task.js';

const userRepository = createUserRepository();
const userService = createUserService(userRepository);
const userHandler = createUserHandler(userService);
const userRouter = createUserRouter(userHandler);
const authRouter = createAuthRouter(userHandler);

const taskRepository = createTaskRepository();
const taskService = createTaskService(taskRepository, userRepository);
const taskHandler = createTaskHandler(taskService);
const taskRouter = createTaskRouter(taskHandler);



const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, ()=>{
    console.log(`Server running at http://${HOST}:${PORT}`)
});
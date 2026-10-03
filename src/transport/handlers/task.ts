import type { Request, Response } from "express";
import type { TaskServices } from "../../services/task/task.types.js";
import type { Error } from "../dto/errors.js";
import type { CreateTask, ChangeTask } from "../dto/requests.js";
import type { TaskResponse } from "../dto/response.js";


export interface TaskHandler{
    addNewTask(req: Request<{}, {}, CreateTask , {} >, res: Response):Promise<Response>
    getAllTasks(req: Request<{}, {}, {} , {
        status?: "todo" | "in_progress" | "done", 
        userId?: number, 
        priority?: "low" | "medium" | "high"
    } >, res: Response<TaskResponse[] | Error>):Promise<Response>
    getTaskById(req: Request<{id:string},{},{},{}>, res: Response<TaskResponse | Error>):Promise<Response>
    changeTaskById(req: Request<{id:string},{},ChangeTask,{}>, res: Response<TaskResponse | Error>):Promise<Response>
    deleteTaskById(req: Request<{id:string},{},{},{}>, res: Response):Promise<Response>
}

export function createTaskHandler(service: TaskServices):TaskHandler{
    const statuses = ["todo", "in_progress", "done"]
    const priorities= ["low", "medium", "high"]
    return{
        async addNewTask(req,res){
            const {userId, title, description, status, priority} = req.body
            if (
                !Number.isInteger(userId) ||
                typeof title !== "string" ||
                typeof description !== "string" ||
                !statuses.includes(status) ||
                !priorities.includes(priority) ||
                !title.trim() ||
                !description.trim() ||
                !status.trim() ||
                !priority.trim()
            ){
                return res.status(422).json({
                    message: 'Invalid data.'
                })
            }
            try{
                const result = await service.addNewTask(req.body);
                if(!result){
                    return res.status(404).json({
                        message: 'There is no user with this id.'
                    });
                }
                
                return res.status(201).json({
                    message: 'Task was created.',
                    task: result
                });
            } catch(error){
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        },
        
        async getAllTasks(req,res){
            const {status, userId, priority} = req.query
            const numUserId = Number(userId)
            
            if (status&&  !statuses.includes(status)){
                return res.status(400).json({
                    message: 'Invalid status '
                })
            }
            if (priority && !priorities.includes(priority)){
                return res.status(400).json({
                    message: 'Invalid priority'
                })
            }
            if(numUserId && (!Number.isInteger(numUserId) || numUserId< 0) ){
                return res.status(400).json({
                    message: 'Invalid userId'
                })
            }
            try{
                const result = await service.getAllTasks(status, userId, priority)
                return res.status(200).json(result)
            } catch(error){
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        },

        async getTaskById(req,res){
            const {id} = req.params
            const numId = Number(id)
            if (numId<0 || !Number.isInteger(numId)){
                return res.status(400).json({
                    message: 'Invalid data in id params.'
                })
            }
            try{
                const result = await service.getTaskById(numId)
                if(!result){
                    return res.status(404).json({
                        message: 'There is no task with this id.'
                    });
                }
                return res.status(200).json(result);
            }catch(error){
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        
        },

        async changeTaskById(req,res){
            const {id} = req.params;
            const { title, description, status, priority } = req.body
            const numId = Number(id);
            if (numId<0 || !Number.isInteger(numId)){
                return res.status(400).json({
                    message: 'Invalid data in id params.'
                })
            }
            if (
                typeof title !== "string" ||
                typeof description !== "string" ||
                !statuses.includes(status) ||
                !priorities.includes(priority) ||
                !title.trim() ||
                !description.trim() ||
                !status.trim() ||
                !priority.trim()
            ){
                return res.status(422).json({
                    message: 'Invalid data.'
                })
            }
            try{
                const result = await service.changeTaskById(numId, req.body);
                if(!result){
                    return res.status(404).json({
                        message: 'There is no user with this id.'
                    });
                }
                
                return res.status(201).json(result);
            } catch(error){
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        },
        
        async deleteTaskById(req,res){
            const {id} = req.params;
            const numId = Number(id);
            if (numId<0 || !Number.isInteger(numId)){
                return res.status(400).json({
                    message: 'Invalid data in id params.'
                })
            }
            try{
                const result = await service.deleteTaskById(numId);
                if(result === false){
                    return res.status(404).json({
                        message: 'There is no task with this id.'
                    });
                }
                return res.status(200).json({
                    message: 'Task was deleted.'
                });
            }catch(error){
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        },
    }
}
import type { Task } from "../../domen/task/entity.js";
import type { NewTask, ChangeTask } from "../../domen/task/repository.js";

export interface TaskServices{
    addNewTask(data: NewTask):Promise<Task | undefined>
    getAllTasks(
        status?: "todo" | "in_progress" | "done", 
        userId?: number, 
        priority?: "low" | "medium" | "high"
    ):Promise<Task[] | undefined>
    getTaskById(id:number):Promise< Task | undefined>
    changeTaskById(
        id: number,
        data: ChangeTask
    ):Promise<Task | undefined>
    deleteTaskById(id:number):Promise<boolean | undefined>
}
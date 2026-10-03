import type {Task} from "./entity.js"

export type NewTask = Omit<Task, "createdAt" | "updatedAt"| "id">;
export type ChangeTask = Partial<NewTask>;

export interface TaskRepository{
    addNewTask(data: NewTask):Promise<Task>
    getAllTasks(
        status?: "todo" | "in_progress" | "done", 
        userId?: number, 
        priority?: "low" | "medium" | "high"
    ):Promise<Task[]>
    getTaskById(id:number):Promise<Task| undefined>
    changeTaskById(
        id: number,
        data: ChangeTask
    ):Promise<Task | undefined>
    deleteTaskById(id:number):Promise<boolean>
}
